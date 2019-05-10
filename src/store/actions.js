import {ACTION_SIGNIN, ACTION_TOGGLE_LOGIN, ACTION_TOGGLE_SIGNUP} from './actionTypes'
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

export function toggleSignupModal(theBool) {
  return {
    type: ACTION_TOGGLE_SIGNUP,
    toggleSignupModal: theBool
  }
}

