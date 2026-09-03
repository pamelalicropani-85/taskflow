import { createNativeStackNavigator } from "@react-navigation/native-stack"

import TasksScreen from "../screens/tasks/TasksScreen"
import TaskDetailScreen from "../screens/tasks/TaskDetailScreen"
import TaskFormScreen from "../screens/tasks/TaskFormScreen"

import { RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()

const TaskStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="TaskList"
                component={TasksScreen}
                options={{
                    title: 'Mis tareas',
                }}
            />
            <Stack.Screen
                name="TaskDetail"
                component={TaskDetailScreen}
                options={{
                    title: 'Detalles de la tarea'
                }}
            />
            <Stack.Screen
                name="TaskForm"
                component={TaskFormScreen}
                options={{
                    title: 'Nueva tarea',
                    presentation: 'modal'
                }}
            />
        </Stack.Navigator>
    )
}

export default TaskStack
