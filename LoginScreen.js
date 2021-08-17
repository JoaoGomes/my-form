import React, { useEffect } from 'react';
import { Alert, View, TextInput, Text, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginScreen.style';

const fieldValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required('O email não pode ser vazio')
		.email('Digite um email válido'),
	password: yup
		.string()
		.required('A senha não pode ser vazia')
		.min(6, 'A senha deve conter pelo menos 6 dígitos')
})

const LoginScreen = () => {
	const { register, setValue, handleSubmit, errors } = useForm ({validationSchema: fieldValidationSchema});
    //const onSubmit = (data) => Alert.alert(data.email, data.password);
    const onSubmit = (data) => console.log(data.email, data.password);

	useEffect (() => {
		register("email");
		register("password");
	}, [register]);

    return (
		<View style={styles.mainContainer}>
			<TextField
			label={'Email'}
            error={errors?.email}
			placeholder={'Digite seu email'}
            onChangeText={text => setValue("email", text)}
			/>
			<TextField
			label={'Senha'}
            error={errors?.password}
			placeholder={'Digite sua senha'}
            onChangeText={text=> setValue("password", text)}
			/>
			<Button title='Continuar' onPress={handleSubmit(onSubmit)} />
        </View>
	)
}

const TextField= ({ error, label, ...inputProps}) => (
	<View style={styles.container}>
	    <Text style={styles.label}>{label}</Text>
	    <TextInput
            style={[styles.input, !!error && styles.borderError]}
            {...inputProps}
        />
        {!!error && 
	    <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
);

export default LoginScreen;
