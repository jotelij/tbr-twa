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


export default function MintCard() {
    const { connected, wallet } = useTonConnect();
    const { balance, sBalance, mint } = useBirrToken();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values: any) {
        return new Promise<void>(async (resolve) => {
            mint(toNano(values['mint_amount']), Address.parse(values["receiver"])).finally(resolve);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.receiver == null ? false : true}>
                <FormLabel htmlFor='receiver'>Receiver Address</FormLabel>
                <Input
                    type="text"
                    id='receiver'
                    placeholder='EQBen2ciha4rR5h.....'
                    {...register('receiver', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {/* {!errors.name && !errors.name?.message} */}
                    {!errors.receiver}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name == null ? false : true}>
                <FormLabel htmlFor='mint_amount'>Amount</FormLabel>
                <Input
                    type="number"
                    id='mint_amount'
                    placeholder='0'
                    {...register('mint_amount', {
                        required: 'This is required',
                        minLength: { value: 1, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {/* {!errors.name && !errors.name?.message} */}
                    {!errors.name}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Mint
            </Button>
        </form>
    )
}
