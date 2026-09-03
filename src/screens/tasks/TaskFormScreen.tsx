import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { CATEGORIES, Category, createId, DueDate, DUE_DATES, Task } from '../../types'
import { colors, radius, spacing } from '../../theme'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'> & {
  onAdd: (task: Task) => void
}

const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[]
const DATE_KEYS = Object.keys(DUE_DATES) as DueDate[]

export default function TaskFormScreen({ navigation, onAdd }: Props) {
  const insets = useSafeAreaInsets()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('personal')
  const [date, setDate] = useState<DueDate>('today')
  const canSubmit = title.trim().length > 0 && description.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onAdd({
      id: createId(),
      title: title.trim(),
      description: description.trim(),
      category,
      date,
      completed: false
    })
    navigation.navigate('TaskList')
  }

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.sheet, { paddingBottom: spacing.lg + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Nueva tarea</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="¿Qué hay que hacer?"
          placeholderTextColor={colors.muted}
          value={title}
          onChangeText={setTitle}
          autoFocus
          returnKeyType="next"
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Descripción de la tarea"
          placeholderTextColor={colors.muted}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.chipRow}>
          {CATEGORY_KEYS.map((key) => {
            const cat = CATEGORIES[key]
            const active = category === key
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.chip, { borderColor: cat.color }, active && { backgroundColor: cat.color }
                ]}
                onPress={() => setCategory(key)}>
                <Text
                  style={[
                    styles.chipText, { color: active ? colors.surface : cat.color }
                  ]}
                >
                  {cat.emoji} {cat.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.label}>¿Para cuándo?</Text>
        <View style={styles.chipRow}>
          {DATE_KEYS.map((key) => {
            const active = date === key
            return (
              <TouchableOpacity
                key={key}
                style={[styles.chip, styles.chipNeutral, active && styles.chipNeutralActive]}
                onPress={() => setDate(key)}>
                <Text style={[styles.chipText, { color: active ? colors.surface : colors.ink }]}>
                  {DUE_DATES[key]}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <TouchableOpacity
          style={[styles.submit, !canSubmit && styles.submitDisabled]}
          onPress={handleSubmit} disabled={!canSubmit}
          activeOpacity={0.85}>
          <Text style={styles.submitText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.surface
  },
  sheet: {
    padding: spacing.lg,
    gap: spacing.sm
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink
  },
  close: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '700'
  },
  input: {
    backgroundColor: colors.canvas,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    color: colors.ink
  },
  textarea: {
    minHeight: 64,
    textAlignVertical: 'top'
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xs
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  chip: {
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2
  },
  chipNeutral: {
    borderColor: colors.border,
    backgroundColor: colors.canvas
  },
  chipNeutralActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700'
  },
  submit: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm
  },
  submitDisabled: {
    opacity: 0.4
  },
  submitText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800'
  }
})
