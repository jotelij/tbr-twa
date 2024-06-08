import React from 'react'
import { Flex, Container, Heading, Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import BirrTokenComp from '../components/BirrTokenComp';
import BalanceCard from '../components/BalanceCard';
import MintCard from '../components/MintCard';
import TransferBirr from '../components/TransferBirr';

export default function Dashboard() {
    return (
        <>
            {/* <Heading as="h3" size={"md"}>Birr Token</Heading> */}
            {/* <BalanceCard /> */}
            {/* <BirrTokenComp /> */}
            {/* <Card mt="10px">
                <CardBody>
                    <Heading as="h5" size="md" mb="10px">Send Mint</Heading>
                    <MintCard />
                </CardBody>
            </Card> */}
            <Card mt="10px">
                <CardBody>
                    <Heading as="h5" size="md" mb="10px">Transfer eBRR</Heading>
                    <TransferBirr />
                </CardBody>
            </Card>
        </>
    );
}
