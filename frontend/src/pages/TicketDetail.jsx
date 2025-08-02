import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API call
  useEffect(() => {
    const fetchTicket = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockTicket = {
        id: parseInt(id),
        subject: 'Login Issue with Two-Factor Authentication',
        description: 'I am unable to log into my account. The two-factor authentication code is not being sent to my phone. I have tried multiple times and checked my phone settings. This is preventing me from accessing important documents.',
        status: 'In Progress',
        category: 'Technical Support',
        priority: 'High',
        createdAt: '2024-08-02T10:30:00Z',
        updatedAt: '2024-08-02T14:45:00Z',
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'JD'
        },
        agent: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@quisol.com',
          avatar: 'SW'
        },
        comments: [
          {
            id: 1,
            message: 'Thank you for contacting QuiSol support. I understand you\'re having trouble with the two-factor authentication. Let me help you resolve this issue.',
            sender: 'Sarah Wilson',
            senderRole: 'agent',
            createdAt: '2024-08-02T11:15:00Z'
          },
          {
            id: 2,
            message: 'I\'ve checked your account settings and I can see that your phone number is correctly configured. Can you please try the following steps:\n\n1. Check if you have any SMS blocking apps\n2. Ensure your phone has good signal\n3. Try requesting a new code\n\nLet me know if this helps!',
            sender: 'Sarah Wilson',
            senderRole: 'agent',
            createdAt: '2024-08-02T11:20:00Z'
          },
          {
            id: 3,
            message: 'Hi Sarah, thanks for the quick response! I tried all the steps you mentioned but I\'m still not receiving the SMS codes. My phone signal is strong and I don\'t have any SMS blocking apps. Is there an alternative method I can use?',
            sender: 'John Doe',
            senderRole: 'user',
            createdAt: '2024-08-02T14:30:00Z'
          }
        ],
        attachments: [
          {
            id: 1,
            name: 'screenshot-login-error.png',
            size: '245 KB',
            url: '#'
          }
        ]
      }
      
      setTicket(mockTicket)
      setLoading(false)
    }

    fetchTicket()
  }, [id])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800 border-red-200'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const comment = {
        id: ticket.comments.length + 1,
        message: newComment,
        sender: 'John Doe', // Current user
        senderRole: 'user',
        createdAt: new Date().toISOString()
      }
      
      setTicket({
        ...ticket,
        comments: [...ticket.comments, comment],
        updatedAt: new Date().toISOString()
      })
      
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Error adding comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
        <p className="text-gray-600 mb-8">The ticket you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/dashboard" 
            className="text-accent hover:text-secondary transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Ticket #{ticket.id}
            </h1>
            <h2 className="text-xl text-gray-700 mb-4">{ticket.subject}</h2>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority} Priority
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Ticket */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {ticket.user.avatar}
                </div>
                <div>
                  <p className="font-medium text-secondary">{ticket.user.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(ticket.createdAt)}</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
              </div>
              
              {/* Attachments */}
              {ticket.attachments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <a href={attachment.url} className="text-accent hover:underline">
                          {attachment.name}
                        </a>
                        <span className="text-gray-400">({attachment.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comments Thread */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Conversation</h3>
            
            {ticket.comments.map((comment) => (
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
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-secondary mb-4">Add a Reply</h4>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Type your reply here..."
                disabled={isSubmitting}
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className={`btn-primary ${(isSubmitting || !newComment.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reply'}
                </button>
                <button
                  type="button"
                  onClick={() => setNewComment('')}
                  className="btn-secondary"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">Ticket Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Category</p>
                <p className="text-gray-600">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Created</p>
                <p className="text-gray-600">{formatDate(ticket.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Last Updated</p>
                <p className="text-gray-600">{formatDate(ticket.updatedAt)}</p>
              </div>
              {ticket.agent && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Assigned Agent</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {ticket.agent.avatar}
                    </div>
                    <p className="text-gray-600">{ticket.agent.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-secondary text-left">
                📧 Email Updates
              </button>
              <button className="w-full btn-secondary text-left">
                🔄 Request Status Update
              </button>
              <button className="w-full btn-secondary text-left">
                ⭐ Rate This Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
