import { Address, toNano } from 'ton-core';
import { useTonConnect } from '../hooks/useTonConnect';
import { useBirrToken } from '../hooks/userBirrToken';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { AddressField, AmountField } from './Fields';
import { ParamValue } from './ActionCard';
import { useState } from 'react';


export default function TranferBirr() {
    const { connected, wallet } = useTonConnect();

    const [tonAmount, setTonAmount] = useState("0.01");
    const [tonRecipient, setTonRecipient] = useState(
        "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"
    );


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values: any) {
        if (!wallet) return;

        return new Promise<void>(async (resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
            // transfer(toNano(values['amount']), Address.parse(values["receiver"]), Address.parse(wallet!)).finally(resolve);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AddressField
                paramName='receiver'
                fieldName='Receiver'
                optional={false}
                sendParam={function (name: string, value: ParamValue, correct: boolean): void {
                    console.log(`name: ${name} - value: ${value} - correct: ${correct} `);
                }}
            />
            <AmountField
                paramName='amount'
                fieldName='Amount'
                optional={false}
                sendParam={function (name: string, value: ParamValue, correct: boolean): void {
                    console.log(`name: ${name} - value: ${value} - correct: ${correct} `);
                }}
            />
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Transfer
            </Button>
        </form>
    )
}
