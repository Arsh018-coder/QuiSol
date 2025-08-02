import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    profilePic: null, // Add profilePic to state
  })
  const [profilePicPreview, setProfilePicPreview] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    if (e.target.name === 'profilePic') {
      const file = e.target.files[0]
      setFormData({
        ...formData,
        profilePic: file,
      })
      if (file) {
        setProfilePicPreview(URL.createObjectURL(file))
      } else {
        setProfilePicPreview(null)
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
      // Clear error when user starts typing
      if (errors[e.target.name]) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length === 0) {
      // Save profilePic as a data URL for demo purposes
      if (formData.profilePic) {
        const reader = new FileReader()
        reader.onloadend = () => {
          localStorage.setItem('profilePic', reader.result)
          alert('Registration successful! (This is a demo)')
          // Redirect or further logic here
        }
        reader.readAsDataURL(formData.profilePic)
      } else {
        localStorage.removeItem('profilePic')
        alert('Registration successful! (This is a demo)')
        // Redirect or further logic here
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-secondary">Create Account</h2>
          <p className="text-gray-600 mt-2">Join QuiSol today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="input-field"
            />
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="mt-2 w-16 h-16 rounded-full object-cover border"
              />
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="user">End User</option>
              <option value="agent">Support Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-accent hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="w-full btn-primary">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
