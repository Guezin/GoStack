import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signInRequest } from '../../store/modules/auth/actions';

export default function SingIn() {
	const schema = Yup.object().shape({
		email: Yup
			.string()
			.email()
			.required('Campo e-mail é obrigatório !'),
		password: Yup
			.string()
			.required('Campo senha é obrigatório !')
	});

	const dispatch = useDispatch();

	function handleSubmit({ email, password }) {
		dispatch(signInRequest(email, password));
	};

	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<Form schema={schema} onSubmit={handleSubmit}>
				<Input name="email" type="text" placeholder="Seu email..." />
				<Input name="password" type="password" placeholder="Sua senha secreta..." />

				<button type="submit">Acessar</button>
				<Link to='/register'>Criar conta gratuita</Link>
			</Form>
		</React.Fragment>
	);
}
