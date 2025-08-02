import { useState } from 'react'

export default function CommentThread({ comments, onAddComment, isLoading = false }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    
    try {
      await onAddComment(newComment)
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                comment.senderRole === 'agent' ? 'bg-secondary' : 'bg-accent'
              }`}>
                {comment.sender.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-secondary">{comment.sender}</p>
                <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
              </div>
              {comment.senderRole === 'agent' && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  Support Agent
                </span>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{comment.message}</p>
            </div>

            {/* Comment Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
              <button className="text-gray-500 hover:text-accent text-sm transition-colors">
                👍 Helpful
              </button>
              <button className="text-gray-500 hover:text-accent text-sm transition-colors">
                💬 Quote
              </button>
              <span className="text-gray-400 text-sm ml-auto">
                #{comment.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
        <h4 className="text-lg font-semibold text-secondary mb-4">Add a Reply</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="input-field resize-none"
              placeholder="Type your reply here..."
              disabled={isSubmitting}
            />
            <p className="text-gray-400 text-sm mt-1">{newComment.length}/1000</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                className="text-gray-500 hover:text-accent text-sm transition-colors"
                disabled={isSubmitting}
              >
                📎 Attach File
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-accent text-sm transition-colors"
                disabled={isSubmitting}
              >
                😊 Add Emoji
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className={`btn-primary ${(isSubmitting || !newComment.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
