import { createStore } from 'redux';
import { ACTION_SIGNIN } from '../store/actionTypes';
import findItApp from './reducers'

export const store = createStore(findItApp, window.STATE_FROM_SERVER)