import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CATEGORIES, DUE_DATES, DemoTask } from '../types'
import { colors, radius, shadow, spacing } from '../theme'

type Props = {
  task: DemoTask
  onPress: (task: DemoTask) => void
  onToggle: (id: string) => void
}

export default function TaskItem({ task, onPress, onToggle }: Props) {
  const cat = CATEGORIES[task.category]

  return (
    <Pressable
      onPress={() => onPress(task)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${task.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.stripe, { backgroundColor: cat.color }]} />

      <View style={styles.content}>
        <Text style={[styles.name, task.completed && styles.nameCompleted]} numberOfLines={1}>
          {task.title}
        </Text>

        {task.description.length > 0 && (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        )}

        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: cat.soft }]}>
            <Text style={[styles.badgeText, { color: cat.color }]}>
              {cat.emoji} {cat.label}
            </Text>
          </View>
          <Text style={styles.date}>{DUE_DATES[task.date]}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        hitSlop={8}
        style={[styles.checkbox, task.completed && styles.checkboxDone]}
      >
        {task.completed && <Text style={styles.checkboxMark}>✓</Text>}
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
    boxShadow: shadow.card
  },
  cardPressed: {
    backgroundColor: colors.primarySoft
  },
  stripe: {
    width: 5,
    alignSelf: 'stretch'
  },
  content: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink
  },
  nameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.muted
  },
  description: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm
  },
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700'
  },
  date: {
    fontSize: 12,
    color: colors.muted
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg
  },
  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success
  },
  checkboxMark: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800'
  }
})
