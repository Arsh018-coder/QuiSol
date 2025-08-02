import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateTicket() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '',
    priority: 'Medium',
    attachment: null
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Technical Support',
    'Account Issues',
    'Billing',
    'Feature Request',
    'Bug Report',
    'General Inquiry'
  ]

  const priorities = [
    { value: 'Low', label: 'Low', color: 'text-green-600' },
    { value: 'Medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'High', label: 'High', color: 'text-red-600' }
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Ticket created:', formData)
        alert('Ticket created successfully! Redirecting to dashboard...')
        navigate('/dashboard')
      } catch (error) {
        console.error('Error creating ticket:', error)
        alert('Error creating ticket. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
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
        <h1 className="text-3xl font-bold text-secondary">Create New Ticket</h1>
        <p className="text-gray-600 mt-2">Describe your issue and we'll help you resolve it</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
              placeholder="Brief description of your issue"
              maxLength="100"
            />
            <div className="flex justify-between mt-1">
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              <p className="text-gray-400 text-sm ml-auto">{formData.subject.length}/100</p>
            </div>
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input-field ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-field"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Please provide detailed information about your issue. Include steps to reproduce, error messages, and any other relevant details."
              maxLength="1000"
            />
            <div className="flex justify-between mt-1">
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <p className="text-gray-400 text-sm ml-auto">{formData.description.length}/1000</p>
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
              />
              <label htmlFor="attachment" className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">
                  {formData.attachment ? formData.attachment.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PNG, JPG, PDF, DOC up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Ticket...
                </div>
              ) : (
                'Create Ticket'
              )}
            </button>
            
            <Link
              to="/dashboard"
              className="flex-1 btn-secondary text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-secondary mb-3">💡 Tips for Better Support</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Be specific and descriptive in your subject line
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Include error messages, screenshots, or relevant details
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Mention steps you've already tried to resolve the issue
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Select the most appropriate category for faster routing
          </li>
        </ul>
      </div>
    </div>
  )
}
