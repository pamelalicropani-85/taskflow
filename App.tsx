import React, { useCallback, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TabKey, Task } from './src/types'
import { colors, spacing } from './src/theme'
import { SEED_TASKS } from './src/data/seed'
import { name } from './src/data'
import FlatListScreen from './src/screens/FlatListScreen'
import ScrollViewScreen from './src/screens/ScrollViewScreen'
import TaskDetailScreen from './src/screens/TaskDetailScreen'
import TaskForm from './src/components/TaskForm'
import TabBar from './src/components/TabBar'
import Header from './src/components/Header'

export default function App() { 
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS) 
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('flatlist')
  const addTask = useCallback((task: Task) => { 
    setTasks((prev) => [task, ...prev])
  }, []) 
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    ) 
    setSelectedTask((sel) => (sel && sel.id === id ? { ...sel, completed: !sel.completed } : sel))
  }, [])
 const deleteTask = useCallback((id: string) => {
  setTasks((prev) => prev.filter((t) => t.id !== id))
  setSelectedTask(null)
  }, [])
  const openDetail = useCallback((task: Task) => setSelectedTask(task), [])  
  const closeDetail = useCallback(() => setSelectedTask(null), [])
 return ( 
 <SafeAreaProvider> 
  <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>   
    <StatusBar style="dark" />
    <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.screen}>
            <Header name={name} totalTasks={tasks.length} />
            <View>
              <Text style={styles.brand}>TaskFlow</Text>
              <Text style={styles.subtitle}>Listas, formulario y detalle</Text>
            </View>
            {selectedTask ? (
            <View style={styles.screen}>
                <TaskDetailScreen       
                  task={selectedTask}
                  onBack={closeDetail}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </View>
            ) : (     
            <View style={styles.screen}>  
            {activeTab === 'flatlist' ? (
                  <FlatListScreen tasks={tasks} onToggle={toggleTask} onSelect={openDetail} />
                ) : (
                  <ScrollViewScreen tasks={tasks} onToggle={toggleTask} onSelect={openDetail} />
                )}       
                <TabBar active={activeTab} onChange={setActiveTab} />   
                <TaskForm onAdd={addTask} />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    flex: {
    flex: 1
  }, 
    safe: {  
    flex: 1,
    backgroundColor: colors.canvas
  },
    screen: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg
  },
    brand: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,  
    letterSpacing: -0.5
  },
    subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.xs
  }
})