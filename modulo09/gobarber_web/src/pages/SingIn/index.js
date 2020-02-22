import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';

export default function SingIn() {
	function handleSubmit(data) {
		console.tron.log(data)
	}
	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<Form onSubmit={handleSubmit}>
				<Input name="email" type="text" placeholder="Seu email..." />
				<Input name="password" type="password" placeholder="Sua senha secreta..." />

				<button type="submit">Acessar</button>
				<Link to='/register'>Criar conta gratuita</Link>
			</Form>
		</React.Fragment>
	);
}
