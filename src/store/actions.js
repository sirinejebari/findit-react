import {ACTION_SIGNIN, ACTION_TOGGLE_LOGIN} from './actionTypes'
export function signIn(text) {
  return {
    type: ACTION_SIGNIN,
    user: text
  }
}

export function toggleLoginModal(theBool) {
  return {
    type: ACTION_TOGGLE_LOGIN,
    toggleLoginModal: theBool
  }
}

