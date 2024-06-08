import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, HStack, Spacer, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { useBirrToken } from '../hooks/userBirrToken';
import { useTonConnect } from '../hooks/useTonConnect';
import { fromNano } from '@ton/core';

export default function BalanceCard() {
    const { connected, wallet } = useTonConnect();
    const { jettonWalletAddress, sBalance, mint, tokenMetaData, jettonData } = useBirrToken();

    return (
        <Card bg='teal.400' color="white" my="10px">
            <CardHeader pb="0px">
                <HStack>
                    <Box mr="10px">
                        <Image src={tokenMetaData ? tokenMetaData.image ?? "" : ""} maxH="32px" />
                    </Box>
                    <Heading size={"lg"} m="0px">{tokenMetaData ? tokenMetaData.symbol ?? "NAN" : "Loading"}</Heading>
                </HStack>
            </CardHeader>
            <CardBody pt="20px">
                {/* <Flex alignItems="end">
                    <HStack alignItems="end">
                        <Heading size={"lg"}>{balance ? fromNano(balance!) : "Loading..."}</Heading>
                        <Heading size={"md"}>eBRR</Heading>
                    </HStack>
                </Flex> */}
                <Heading size={"lg"}>{sBalance}</Heading>
                <Text noOfLines={1} fontSize="0.85em">{jettonWalletAddress}</Text>
            </CardBody>
            {/* <CardFooter>
                { }
                <Box my="20px">
                    <Button minW={"120px"} size={"sm"} disabled={!connected} bg="gray.50" color="teal">Mint</Button>
                </Box>
            </CardFooter> */}
        </Card>
    );
}
