import { ACTION_SIGNIN, ACTION_TOGGLE_LOGIN, ACTION_TOGGLE_SIGNUP, ACTION_SET_AD_PREVIEW } from "./actionTypes";
import { combineReducers } from 'redux'



function applicationState(state = {}, action) {
  switch (action.type) {
    case ACTION_SIGNIN:
      return Object.assign({}, state, {
        user: action.user
      })
    case ACTION_TOGGLE_LOGIN:
      return Object.assign({}, state, {
        toggleLoginModal: action.toggleLoginModal
      })

    case ACTION_TOGGLE_SIGNUP:
      return Object.assign({}, state, {
        toggleSignupModal: action.toggleSignupModal
      })
    default:
      return state
  }
}

function mapState(state = {}, action) {
  switch (action.type) {
    case ACTION_SET_AD_PREVIEW:
      return Object.assign({}, state, {
        adDetails: action.adDetails
      })
    default:
      return state
  }
}


const findItApp = combineReducers({
  applicationState,
  mapState
})

export default findItApp