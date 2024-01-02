import { dataReducer } from './dataReducer'; 
import { createStore } from 'redux';
const reducer = dataReducer; 

export const store = createStore(reducer); 
window.store = store; 

