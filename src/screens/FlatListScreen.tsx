import { useCallback } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { DemoTask } from '../types'
import { spacing, colors } from '../theme'
import TaskItem from '../components/TaskItem'
import EmptyState from '../components/EmptyState'

type Props = {
  tasks: DemoTask[]
  onToggle: (id: string) => void
  onSelect: (task: DemoTask) => void
}

const keyExtractor = (item: DemoTask) => item.id

const FlatListScreen = ({ tasks, onToggle, onSelect }: Props) => {
  const pending = tasks.filter((t) => !t.completed).length

  const renderItem = useCallback(
    ({ item }: { item: DemoTask }) => {
      return <TaskItem task={item} onToggle={onToggle} onPress={onSelect} />
    },
    [onToggle, onSelect]
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mis tareas</Text>
          <View style={styles.counter}>
            <Text style={styles.counterText}>{pending}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {pending === 0 && tasks.length > 0
            ? '¡Todo completado! 🎉'
            : 'Tocá una tarea para ver su detalle'}
        </Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState />}

        initialNumToRender={8}
        windowSize={7}
        maxToRenderPerBatch={8}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    gap: spacing.lg
  },
  header: {
    gap: spacing.sm
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink
  },
  counter: {
    backgroundColor: colors.primarySoft,
    
    minWidth: 32,
    height: 32,
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm
  },
  counterText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 15
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted
  },
  listContent: {
  
    paddingBottom: spacing.xl,
    flexGrow: 1
  }
})

export default FlatListScreen