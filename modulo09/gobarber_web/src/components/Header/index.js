import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from '../Notifications';

import { Container, Content, Profile } from './styles';
import logo from '../../assets/logo-purple.svg';

export default function Header() {
	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="Gobarber" />
					<Link to="/dashboard">DASHBOARD</Link>
				</nav>

				<aside>
					<Notifications />

					<Profile>
						<div>
							<strong>Leandro Guezin Jr</strong>
							<Link to="/profile">Meu perfil</Link>
						</div>
						<img
							src="https://api.adorable.io/avatars/50/abott@adorable.png"
							alt="Leandro Guezin Jr"
						/>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
