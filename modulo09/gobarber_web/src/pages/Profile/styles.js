import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	max-width: 600px;
	margin: 50px auto;

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

		hr {
			border: 0;
			height: 1px;
			background: rgba(255, 255, 255, 0.2);
			margin: 10px 0 20px;
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
	}

	> button {
		width: 100%;
		margin: 10px 0 0;
		height: 44px;
		border: none;
		border-radius: 4px;
		font-weight: bold;
		color: #fff;
		background: #f64c75;
		font-size: 16px;
		transition: background 0.2s;

		&:hover {
			background: ${darken(0.08, '#f64c75')};
		}
	}
`;
