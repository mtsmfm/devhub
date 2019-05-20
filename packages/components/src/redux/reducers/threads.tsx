import immer from 'immer'

import { GitHubComment } from '@devhub/core'

import { Reducer } from '../types'

interface Thread {
  isFetching: boolean
  comments: GitHubComment[]
  error: Error | null
}

export interface State {
  byId: Record<string, Thread | undefined>
}

const initialState: State = { byId: {} }

export const threadsReducer: Reducer<State> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'FETCH_THREAD_REQUEST':
      return immer(state, draft => {
        const t = draft.byId[action.payload.id]!
        t.isFetching = true
        t.error = null
      })
    case 'FETCH_THREAD_SUCCESS':
      return immer(state, draft => {
        const t = draft.byId[action.payload.id]!
        t.isFetching = false
        t.comments = action.payload.comments
      })
    case 'FETCH_THREAD_FAILURE':
      return immer(state, draft => {
        const t = draft.byId[action.payload.id]!
        t.isFetching = false
        t.comments = []
      })
    default:
      return state
  }
}
