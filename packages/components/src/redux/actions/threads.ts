import { createAction, createErrorActionWithPayload } from '../helpers'

import { GitHubComment } from '@devhub/core'

export function fetchThreadRequest(payload: {
  id: string
  params: {
    owner: string
    repo: string
    number: number
  }
}) {
  return createAction('FETCH_THREAD_REQUEST', payload)
}

export function fetchThreadSuccess(payload: {
  id: string
  comments: GitHubComment[]
}) {
  return createAction('FETCH_THREAD_SUCCESS', payload)
}

export function fetchThreadFailure(payload: { id: string }, error: Error) {
  return createErrorActionWithPayload('FETCH_THREAD_FAILURE', payload, error)
}
