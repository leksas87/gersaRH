import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/RootReducer';

//Creacion del store
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

//Exporta el type del rootReducer
export type RootSote = ReturnType<typeof rootReducer>;
