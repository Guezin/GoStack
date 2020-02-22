import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg'

export default function SingUp() {
	function handleSubmit(data) {
		console.tron.log(data)
	}
	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<Form onSubmit={handleSubmit}>
				<Input name="name" type="text" placeholder="Nome completo" />
				<Input name="email" type="text" placeholder="Seu e-mail" />
				<Input name="password" type="password" placeholder="Sua senha secreta" />

				<button type="submit">Criar conta</button>
				<Link to='/'>Já tenho conta</Link>
			</Form>
		</React.Fragment>
	);
}
