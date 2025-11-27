import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import TaskList from './components/TaskList';

export default function App() {
  return (
    <BrowserRouter basename="/frontend">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  )
}
