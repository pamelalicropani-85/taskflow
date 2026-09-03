import { useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Task } from '../../types'
import { spacing, colors, radius, shadow, screenStyles } from '../../theme'
import TaskItem from '../../components/TaskItem'
import EmptyState from '../../components/EmptyState'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAllTasks, selectFilteredTasks, selectTaskFilter, setFilter, TaskFilter, toggleTaskStatus } from '../../store/tasksSlice'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>

const keyExtractor = (item: Task) => item.id

const FILTERS: Array<{ key: TaskFilter; label: string }> = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'completed', label: 'Completadas' }
]

const TasksScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectFilteredTasks)
  const allTasks = useAppSelector(selectAllTasks)
  const filter = useAppSelector(selectTaskFilter)
  const pending = allTasks.filter((t) => !t.completed).length

  const onToggle = useCallback(
    (id: string) => {
      dispatch(toggleTaskStatus(id))
    },
    [dispatch]
  )

  const openDetail = useCallback(
    (task: Task) => {
    navigation.navigate('TaskDetail', { id: task.id });
  },
  [navigation]);

  const openForm = useCallback(() => {
    navigation.navigate('TaskForm')
  }, [navigation])

  const renderItem = useCallback(
    ({ item }: { item: Task }) => {
      return (
         <TaskItem task={item} onToggle={onToggle} onPress={openDetail} />
      )
    },
    [onToggle, openDetail]
  )

  return (
    <View style={screenStyles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>TaskFlow</Text>
          <Text style={styles.appSubtitle}>Listas, formulario y detalle</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mis tareas</Text>
          <View style={styles.counter}>
            <Text style={styles.counterText}>{pending}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {pending === 0 && allTasks.length > 0
            ? '¡Todo completado! 🎉'
            : 'Tocá una tarea para ver su detalle'}
        </Text>

        <View style={styles.filterRow}>
          {FILTERS.map(({ key, label }) => {
            const active = filter === key
            return (
              <TouchableOpacity
                key={key}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => dispatch(setFilter(key))}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
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

      <TouchableOpacity style={styles.fabRow} onPress={openForm} activeOpacity={0.8}>
        <Text style={styles.fabPlus}>+</Text>
        <Text style={styles.fabText}>Nueva tarea</Text>
      </TouchableOpacity>
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
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs
  },
  filterChip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2
  },
  filterChipActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink
  },
  filterChipTextActive: {
    color: colors.surface
  },
  listContent: {

    paddingBottom: spacing.xl,
    flexGrow: 1
  },
  brand: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.5,
  },

  appSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  fabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    boxShadow: shadow.raised
  },
  fabPlus: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '800'
  },
  fabText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800'
  },
})

export default TasksScreen
