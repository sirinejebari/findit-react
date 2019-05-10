import { ACTION_SIGNIN, ACTION_TOGGLE_LOGIN, ACTION_TOGGLE_SIGNUP } from "./actionTypes";
import { combineReducers } from 'redux'

const initialState = {
  applicationState: {}
}

function applicationState(state = {}, action) {
  switch (action.type) {
    case ACTION_SIGNIN:
      return Object.assign({}, state, {
        user: action.user
      })
      case ACTION_TOGGLE_LOGIN:
      return  Object.assign({}, state, {
        toggleLoginModal: action.toggleLoginModal
      })

      case ACTION_TOGGLE_SIGNUP:
      return  Object.assign({}, state, {
        toggleSignupModal: action.toggleSignupModal
      })
    default:
      return state
  }
}

// function toggleModaleState(state = false, action) {
//   switch (action.type) {

    
      

//     default:
//       return state
//   }
// }



const findItApp = combineReducers({
  applicationState
})

export default findItApp