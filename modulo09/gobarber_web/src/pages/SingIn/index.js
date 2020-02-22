import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

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

	function handleSubmit(data) {
		console.tron.log(data)
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
