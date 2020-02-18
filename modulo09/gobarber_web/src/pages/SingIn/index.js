import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg'

export default function SingIn() {
	return (
		<React.Fragment>
			<img src={logo} alt="Logo Gobarber" />

			<form>
				<input type="text" placeholder="Seu email..." />
				<input type="password" placeholder="Sua senha secreta..." />

				<button type="submit">Acessar</button>
				<Link to='/register'>Criar conta gratuita</Link>
			</form>
		</React.Fragment>
	);
}
