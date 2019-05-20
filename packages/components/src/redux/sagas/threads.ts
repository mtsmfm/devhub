import { GitHubComment } from '@devhub/core'
import * as Octokit from '@octokit/rest'
import { all, put, takeEvery } from 'redux-saga/effects'
import { octokit } from '../../libs/github'
import * as actions from '../actions'
import { ExtractActionFromActionCreator } from '../types/base'

function* onFetchThreadRequest(
  action: ExtractActionFromActionCreator<typeof actions.fetchThreadRequest>,
) {
  const comments: Octokit.Response<
    Octokit.IssuesListCommentsResponse
  > = yield octokit.issues.listComments(action.payload.params)
  yield put(
    actions.fetchThreadSuccess({
      comments: (comments.data as any) as GitHubComment[],
    }),
  )
}

export function* threadsSagas() {
  yield all([takeEvery('FETCH_THREAD_REQUEST', onFetchThreadRequest)])
}
