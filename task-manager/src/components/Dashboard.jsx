import TaskList from './TaskList'

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Task Manager Dashboard</h1>
      <TaskList />
    </div>
  )
}
