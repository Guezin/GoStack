import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	html, body, #root {
		height: 100%;
	}

	html, body, input, button {
		font: 14px Roboto, Arial, sans-serif;
	}

	button {
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}
`;
