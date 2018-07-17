import {
  GET_NOTES_LIST_START,
  GET_NOTES_LIST_END
} from '../actions/_constants'

const initialState = {
  all: [],
  pending: false
}

export function notes(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NOTES_LIST_START:
      return {
        ...initialState,
        pending: true
      }
    case GET_NOTES_LIST_END:
      return {
        ...state,
        pending: false,
        all: action.all
      }
    default:
      return state
  }
}
