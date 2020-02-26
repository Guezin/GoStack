import produce from 'immer';

const INITIAL_STATE = {
	token: null,
	signed: false,
	loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
	/* *** REFATORADO *** */
	return produce(state, draft => {
		switch (action.type) {
			case '@auth/SIGN_IN_REQUEST': {
				draft.loading = true;
				break;
			}
			case '@auth/SIGN_IN_SUCCESS': {
				draft.token = action.payload.token;
				draft.signed = true;
				draft.loading = false;
				break;
			}
			case '@auth/SIGN_FAILURE': {
				draft.loading = false;
				break;
			}
			default:
				return state;
		}
	});
}
/* *** ANTIGO *** */
// switch (action.type) {
// 	case '@auth/SIGN_IN_REQUEST':
// 		return produce(state, draft => {
// 			draft.token = action.payload.token;
// 			draft.loading = true;
// 		});
// 	case '@auth/SIGN_IN_SUCCESS':
// 		return produce(state, draft => {
// 			draft.token = action.payload.token;
// 			draft.signed = true;
// 			draft.loading = false
// 		});
// 	case '@auth/SIGN_FAILURE':
// 		return produce(state, draft => {
// 			draft.token = action.payload.token;
// 			draft.loading = false;
// 		});
// 	default:
// 		return state;
// }
