import { useState } from 'react'
import { name } from '../data'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import EmptyState from '../components/EmptyState'
import FlatListScreen from './FlatListScreen'
import TaskDetailScreen from './TaskDetailScreen'
import type { DemoTask } from '../types'

const HomeScreen = () => {
  const [taskList, setTaskList] = useState<DemoTask[]>([])
  const [selectedTask, setSelectedTask] = useState<DemoTask | null>(null)

  const handleAddTask = (task: DemoTask) => {
    setTaskList((prev) => [task, ...prev])
  }

  const handleToggle = (id: string) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
    setSelectedTask((prev) =>
      prev && prev.id === id ? { ...prev, completed: !prev.completed } : prev
    )
  }

  const handleSelect = (task: DemoTask) => {
    setSelectedTask(task)
  }

  const handleBack = () => {
    setSelectedTask(null)
  }

  const handleDelete = (id: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id))
    setSelectedTask(null)
  }

  if (selectedTask) {
    return (
      <TaskDetailScreen
        task={selectedTask}
        onBack={handleBack}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    )
  }

  return (
    <>
      <Header name={name} totalTasks={taskList.length} />
      <TaskForm onAdd={handleAddTask} />
      {taskList.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatListScreen tasks={taskList} onToggle={handleToggle} onSelect={handleSelect} />
      )}
    </>
  )
}

export default HomeScreen
