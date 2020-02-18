import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg'

export default function SingUp() {
	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<form>
				<input type="text" placeholder="Nome completo" />
				<input type="text" placeholder="Seu e-mail" />
				<input type="password" placeholder="Sua senha secreta" />

				<button type="submit">Criar conta</button>
				<Link to='/'>Já tenho conta</Link>
			</form>
		</React.Fragment>
	);
}
