import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CATEGORIES, Category, Task, createId } from '../types'
import { colors, radius, shadow, spacing } from '../theme'

type Props = {
  onAdd: (task: Task) => void
}

const categoryKeys = Object.keys(CATEGORIES) as Category[]

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>(categoryKeys[0])
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const isButtonDisabled = title.trim().length < 5

  const handleSubmit = () => {
    let valid = true

    setTitleError('')
    setDescriptionError('')

    if (title.trim().length < 5) {
      setTitleError('El título debe tener al menos 5 caracteres')
      valid = false
    }

    if (description.trim().length < 10) {
      setDescriptionError('La descripción debe tener al menos 10 caracteres')
      valid = false
    }

    if (!valid) {
      return
    }

    onAdd({
      id: createId(),
      title: title.trim(),
      description: description.trim(),
      category,
      date: 'today',
      completed: false
    })

    setTitle('')
    setDescription('')
    setCategory(categoryKeys[0])
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Nueva tarea</Text>

      <TextInput
        style={[styles.input, titleError && styles.inputError]}
        placeholder="¿Qué tenés que hacer?"
        placeholderTextColor={colors.muted}
        value={title}
        onChangeText={setTitle}
        autoCapitalize="sentences"
      />
      {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

      <TextInput
        style={[styles.input, styles.textArea, descriptionError && styles.inputError]}
        placeholder="Descripción"
        placeholderTextColor={colors.muted}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        autoCapitalize="sentences"
      />
      {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}

      <View style={styles.chipRow}>
        {categoryKeys.map((key) => {
          const isSelected = key === category
          const cat = CATEGORIES[key]
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setCategory(key)}
              style={[
                styles.chip,
                isSelected && { backgroundColor: cat.color, borderColor: cat.color }
              ]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat.emoji} {cat.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <TouchableOpacity
        disabled={isButtonDisabled}
        onPress={handleSubmit}
        activeOpacity={0.8}
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Agregar tarea</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    boxShadow: shadow.card
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink
  },
  input: {
    backgroundColor: colors.canvas,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.ink
  },
  inputError: {
    borderColor: colors.danger
  },
  textArea: {
    minHeight: 76
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvas
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.muted
  },
  chipTextSelected: {
    color: colors.surface
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginTop: -8
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md + 2,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: colors.muted
  },
  buttonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700'
  }
})
