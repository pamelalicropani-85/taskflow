import { useCallback, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import TasksScreen from "../screens/tasks/TasksScreen"
import TaskDetailScreen from "../screens/tasks/TaskDetailScreen"
import TaskFormScreen from "../screens/tasks/TaskFormScreen"

import { RootStackParamList } from "./types"
import { Task } from "../types"
import { SEED_TASKS } from "../data/seed"

const Stack = createNativeStackNavigator<RootStackParamList>()

const TaskStack = () => {
    const [tasks, setTasks] = useState<Task[]>(SEED_TASKS)

    const addTask = useCallback((task: Task) => {
        setTasks((prev) => [task, ...prev])
    }, [])

    const toggleTask = useCallback((id: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        )
    }, [])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="TaskList"
                options={{
                    title: 'Mis tareas',
                }}
            >
                {(props) => <TasksScreen {...props} tasks={tasks} onToggle={toggleTask} />}
            </Stack.Screen>
            <Stack.Screen
                name="TaskDetail"
                options={{
                    title: 'Detalles de la tarea'
                }}
            >
                {(props) => <TaskDetailScreen {...props} tasks={tasks} />}
            </Stack.Screen>
            <Stack.Screen
                name="TaskForm"
                options={{
                    title: 'Nueva tarea',
                    presentation: 'modal'
                }}
            >
                {(props) => <TaskFormScreen {...props} onAdd={addTask} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default TaskStack
