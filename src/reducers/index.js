import { combineReducers } from 'redux';
import modules from "./modules";

const rootReducer = combineReducers({
    modules: modules
});

export default rootReducer;
