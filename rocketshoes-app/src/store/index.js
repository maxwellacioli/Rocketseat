import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';

const enhander =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhander);

export default store;
