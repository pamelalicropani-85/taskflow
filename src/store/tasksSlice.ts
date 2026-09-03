import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, createId, DueDate, Task } from '../types'
import { SEED_TASKS } from '../data/seed'

export type TaskFilter = 'all' | 'completed' | 'pending'

type NewTaskInput = {
  title: string
  description: string
  category: Category
  date: DueDate
}

type TasksState = {
  items: Task[]
  filter: TaskFilter
}

const initialState: TasksState = {
  items: SEED_TASKS,
  filter: 'all'
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload)
      },
      prepare(input: NewTaskInput) {
        return {
          payload: {
            id: createId(),
            completed: false,
            ...input
          } as Task
        }
      }
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      const task = state.items.find((t) => t.id === action.payload)
      if (task) task.completed = !task.completed
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    setFilter(state, action: PayloadAction<TaskFilter>) {
      state.filter = action.payload
    }
  }
})

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.items
export const selectTaskFilter = (state: { tasks: TasksState }) => state.tasks.filter
export const selectTaskById = (id: string) => (state: { tasks: TasksState }) =>
  state.tasks.items.find((t) => t.id === id)
export const selectFilteredTasks = (state: { tasks: TasksState }) => {
  const { items, filter } = state.tasks
  if (filter === 'completed') return items.filter((t) => t.completed)
  if (filter === 'pending') return items.filter((t) => !t.completed)
  return items
}

export default tasksSlice.reducer
