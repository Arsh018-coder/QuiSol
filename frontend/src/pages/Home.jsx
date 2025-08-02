import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ChartWidget from '../components/ChartWidget'
import apiService from '../services/api'

export default function Home() {
  const [backendStatus, setBackendStatus] = useState('checking...')

  useEffect(() => {
    // Test backend connection on component mount
    const testConnection = async () => {
      try {
        const health = await apiService.healthCheck()
        setBackendStatus('✅ Connected')
        console.log('Backend health check:', health)
      } catch (error) {
        setBackendStatus('❌ Disconnected')
        console.error('Backend connection failed:', error)
      }
    }
    
    testConnection()
  }, [])
  // 🎯 Sample chart data — replace with API later
  const chartData = {
    labels: ['Technical', 'Billing', 'Account', 'Bug', 'Other'],
    datasets: [
      {
        label: 'Tickets Asked',
        data: [22, 14, 9, 39, 7],
        backgroundColor: '#8A1C7C', // Accent
        borderRadius: 6,
        maxBarThickness: 36,
      },
      {
        label: 'Replies',
        data: [18, 12, 8, 32, 7],
        backgroundColor: '#1F0322', // Secondary
        borderRadius: 6,
        maxBarThickness: 36,
      },
    ],
  }

  return (
    <div className="text-secondary">
      {/* 👋 Hero Section */}
      <section className="text-center py-20 bg-dominant">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-accent">QuiSol</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            A smart and simple helpdesk to streamline your support workflow.
            Raise tickets, get quick help, and track issue status in real-time—all in one place.
          </p>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Backend status: {backendStatus}</span>
          </div>
          <div className="space-x-4">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 Chart Section */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <ChartWidget data={chartData} title="Tickets vs Replies by Category" />
      </section>

      {/* 💼 Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What QuiSol Offers</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Simple Ticketing</h3>
            <p className="text-gray-600">
              Quickly raise, track, and respond to support tickets—no clutter, just clarity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">
              Tailored experiences for admins, agents, and end-users with secure login control.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 17v-6a2 2 0 012-2h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12c0 4.971-4.477 9-10 9S1 16.971 1 12 5.477 3 11 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-gray-600">
              Visualize open tickets, resolution times, and agent productivity.
            </p>
          </div>
        </div>
      </section>

      {/* 💡 Call to Action Footer */}
      <section className="bg-accent text-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Start resolving faster with QuiSol</h2>
        <Link to="/register" className="btn-secondary text-accent bg-white hover:bg-gray-100">
          Create Account
        </Link>
      </section>
    </div>
  )
}
