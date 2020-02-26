import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
	height: 100%;
	background: linear-gradient(-90deg, #7159c1, #ab59c1);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 315px;
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		input {
			background: rgba(0, 0, 0, 0.1);
			border: none;
			border-radius: 4px;
			height: 44px;
			padding: 0 15px;
			color: #fff;
			margin: 0 0 15px 0;

			&::placeholder {
				color: rgba(255, 255, 255, 0.7);
			}
		}

		span {
			color: #f64c75;
			align-self: flex-start;
			font-weight: bold;
			margin: 0 0 10px;
		}

		button {
			height: 44px;
			border: none;
			border-radius: 4px;
			font-weight: bold;
			color: #fff;
			background: #3b9eff;
			font-size: 16px;
			transition: background 0.2s;

			&:hover {
				background: ${darken(0.04, '#3B9EFF')};
			}
		}

		a {
			margin-top: 15px;
			color: #fff;
			font-size: 16px;
			opacity: 0.8;

			&:hover {
				opacity: 1;
			}
		}
	}
`;
