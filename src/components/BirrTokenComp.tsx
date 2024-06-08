import React from 'react'
import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useBirrToken } from '../hooks/userBirrToken';
import { Card, CardHeader, CardBody, Text, Flex, HStack, Heading } from '@chakra-ui/react';


export default function BirrTokenComp() {
  const { connected, wallet } = useTonConnect();
  const { jettonWalletAddress, balance, mint } = useBirrToken();

    return (
      <Card>
        <CardHeader >
            {/* <Text fontSize={"1.3em"}>Wallet</Text> */}
            <Heading as="h3" size="lg">Birr Token</Heading>
        </CardHeader>
        <CardBody>
            <HStack>
                <Text>My Wallet: </Text>
                <Text noOfLines={1}>{wallet ? Address.parse(wallet).toString() : "Loading..." }</Text>
            </HStack>
            <HStack>
                <Text>eBRR Wallet: </Text>
                <Text noOfLines={1}>{jettonWalletAddress}</Text>
            </HStack>
            <HStack>
                <Text>Balance: </Text>
                <Text>{ balance ? fromNano(balance) : "Loading..."}</Text>
            </HStack>
            {/* <Button
                disabled={!connected}
                onClick={async () => {
                    mint();
                }}
                >
                Get jettons from faucet
                </Button> */}
        </CardBody>
    </Card>
  );
}
