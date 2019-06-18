import {ACTION_SIGNIN, ACTION_TOGGLE_LOGIN, ACTION_TOGGLE_SIGNUP, ACTION_SET_AD_PREVIEW} from './actionTypes'
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

export function setAdPreviewDetails(adDetails) {
  return {
    type: ACTION_SET_AD_PREVIEW,
    adDetails: adDetails
  }
}

