import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SingUp() {
	const schema = Yup.object().shape({
		name: Yup.string().required('Campo nome é obrigatório !'),
		email: Yup.string()
			.email()
			.required('Campo e-mail é obrigatório !'),
		password: Yup.string()
			.min(6, 'No minímo 6 caracteres.')
			.required('Campo senha é obrigatório !'),
	});

	const dispatch = useDispatch();

	function handleSubmit({ name, email, password }) {
		dispatch(signUpRequest(name, email, password));
	}

	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<Form schema={schema} onSubmit={handleSubmit}>
				<Input name="name" type="text" placeholder="Nome completo" />
				<Input name="email" type="text" placeholder="Seu e-mail" />
				<Input
					name="password"
					type="password"
					placeholder="Sua senha secreta"
				/>

				<button type="submit">Criar conta</button>
				<Link to="/">Já tenho conta</Link>
			</Form>
		</React.Fragment>
	);
}
