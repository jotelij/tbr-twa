import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { Address, Cell, Contract, fromNano, OpenedContract, toNano } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { BirrToken, JettonData, Mint } from "../contracts/birrToken";
import { JettonDefaultWallet, TokenTransfer } from "../contracts/jettonDefaultWallet";
import { useEffect, useState } from 'react';
import { JettonMetaDataKeys, readJettonMetadata } from "../utils/metadataHelpers";
// import { JettonMaster } from "ton";
// import { jett } from "@ton/crypto";

export function useBirrToken() {
    const { wallet, sender } = useTonConnect();
    const { client } = useTonClient();

    const [balance, setBalance] = useState<string>("");
    const [jettonData, setJettonData] = useState<JettonData>();
    const [tokenMetaData, setMetaTokenData] = useState<{ [s in JettonMetaDataKeys]?: string }>();

    const masterAddress = "EQBrkZtO_oJoUm7ZmpHfdcrLKA14d7l8MyzhNZBfj63hpgvQ"

    const birrTokenContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;

        const contract = BirrToken.fromAddress(Address.parse(masterAddress));

        return client.open(contract) as OpenedContract<BirrToken>;
    }, [client, wallet]);

    const birrWalletContract = useAsyncInitialize(async () => {
        if (!birrTokenContract || !client || !wallet) return;

        const birrWalletAddress = await birrTokenContract.getGetWalletAddress(Address.parse(wallet!));



        return client!.open(
            JettonDefaultWallet.fromAddress(birrWalletAddress)
        ) as OpenedContract<JettonDefaultWallet>;

    }, [birrTokenContract, client]);

    const { data, isFetching } = useQuery(
        ["birr_token"],
        async () => {
            if (!birrWalletContract) {
                setBalance("");
                return null;
            };

            const balance = (await birrWalletContract.getGetWalletData()).balance.toString();
            setBalance(fromNano(balance));

            return balance;
        },
        { refetchInterval: 3000 }
    );

    useEffect(() => {
        if (!birrTokenContract) return;
        async function getJettonMetadata(birrTokenContract: OpenedContract<BirrToken>) {
            const jettonData = await birrTokenContract.getGetJettonData();
            setJettonData(jettonData);
            const jettonContent = await readJettonMetadata(jettonData.content);
            setMetaTokenData(jettonContent.metadata);
        }

        getJettonMetadata(birrTokenContract);
    }, [birrTokenContract]);


    return {
        jettonWalletAddress: birrWalletContract?.address.toString(),
        balance: isFetching ? null : data,
        sBalance: balance,
        mint: async (amount: bigint, to: Address) => {
            if (!birrTokenContract || !wallet) return;

            const msg: Mint = {
                $$type: "Mint",
                amount: amount,
                receiver: to
            };
            await birrTokenContract?.send(sender,
                {
                    value: toNano("0.04")
                },
                msg
            );
        },
        tokenMetaData: tokenMetaData,
        jettonData: jettonData,
        transfer: async (amount: bigint, to: Address, response_destination: Address) => {
            const msg: TokenTransfer = {
                $$type: "TokenTransfer",
                queryId: 0n,
                amount: amount,
                destination: to,
                response_destination: response_destination,
                forward_ton_amount: 0n,
                forward_payload: Cell.EMPTY,
                custom_payload: null
            };
            await birrWalletContract?.send(sender,
                {
                    value: toNano("0.05")
                },
                msg
            );
        }
    };
}