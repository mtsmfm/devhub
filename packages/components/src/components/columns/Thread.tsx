import React from 'react'

import { GitHubComment } from '@devhub/core'

interface ThreadProps {
  comments: GitHubComment[]
}

export const Thread = React.memo(({ comments }: ThreadProps) => {
  return (
    <>
      {comments.map(c => (
        <div key={c.id}>{c.body}</div>
      ))}
    </>
  )
})
