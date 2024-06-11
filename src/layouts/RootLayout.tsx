import React from 'react';
import { Container, HStack, Button, Box, Flex, Spacer } from '@chakra-ui/react';
import AppBar from '../components/AppBar';
import { Outlet } from 'react-router-dom';
import NetworkBadge from '../components/NetBadge';
import { AppTitle } from '../components/AppTitle';
import { ConnectButton } from '../components/ConnectButton';
import Footer from '../components/Footer';

export default function RootLayout() {
    return (
        <>
            {/* <AppBar /> */}
            <NetworkBadge />
            <Box px="20px" py="20px" backgroundColor="#f7f9fb" min-height="100vh">
                {/* <Box padding={["30px 0px", "20px 20px", "20px 70px", "20px 70px"]} backgroundColor="#f7f9fb" min-height="100vh"> */}
                <Box minHeight="90vh">
                    <Box fontFamily="Inter" bg="#F7F9FB">
                        <Flex alignItems="center">
                            <AppTitle title={import.meta.env.VITE_REACT_APP_TITLE || "Blueprint Dapp"} />
                            <Spacer />
                            <Flex alignItems="center" mt="-6">
                                <ConnectButton />
                            </Flex>
                        </Flex>

                        <Container as="main" my="20px">
                            <Outlet />
                        </Container>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    )
}
