import React from 'react'
import { useTonConnect } from '../hooks/useTonConnect';
import { Container, Flex, Box, Heading, Spacer, HStack, Text, Button, useToast, Avatar, AvatarBadge } from "@chakra-ui/react";
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';

export default function AppBar() {
    const { network } = useTonConnect();

    return (
        <Flex as="nav" mb="40px" alignItems={"center"}>
            <Heading as="h1">Logo</Heading>

            <Spacer />

            <HStack>
                {/* <Text>adas@dsddd.com</Text> */}

                <TonConnectButton />
                <Avatar
                    name={
                        network
                            ? network === CHAIN.MAINNET
                                ? "mainnet"
                                : "testnet"
                            : "N/A"
                    }
                    // src="/img/mario.png"
                    bg={
                        network
                            ? network === CHAIN.MAINNET
                                ? "teal"
                                : "pink"
                            : "gray.200"
                    }
                >
                    {/* <AvatarBadge width={"1.3em"} bg="teal.500">
                        <Text fontSize={"xs"} color={"white"}>5</Text>
                    </AvatarBadge> */}
                </Avatar>
            </HStack>
        </Flex>
    );
}
