import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTicket from './pages/CreateTicket'
import TicketDetail from './pages/TicketDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dominant">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
