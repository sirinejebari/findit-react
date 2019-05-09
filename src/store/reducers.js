import { ACTION_SIGNIN, ACTION_TOGGLE_LOGIN } from "./actionTypes";
import { combineReducers } from 'redux'

const initialState = {
  isUserSignedIn: false,
  toggleLoginModal: false
}

function isUserSignedIn(state = false, action) {
  switch (action.type) {
    case ACTION_SIGNIN:
      return Object.assign({}, state, {
        isUserSignedIn: action.isUserSignedIn
      })

    default:
      return state
  }
}

function toggleModaleState(state = false, action) {
  switch (action.type) {

    case ACTION_TOGGLE_LOGIN:
      return  Object.assign({}, state, {
        toggleLoginModal: action.toggleLoginModal
      })
      

    default:
      return state
  }
}



const findItApp = combineReducers({
  isUserSignedIn,
  toggleModaleState
})

export default findItApp