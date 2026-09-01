import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Task } from '../types'
import { colors, radius, spacing } from '../theme'
import TaskItem from '../components/TaskItem'
import EmptyState from '../components/EmptyState'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onSelect: (task: Task) => void
}

export default function ScrollViewScreen({ tasks, onToggle, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ScrollView + .map()</Text>
        <Text style={styles.subtitle}>La misma lista, sin virtualización</Text>
      </View>

      <View style={styles.warnCard}>
        <Text style={styles.warnTitle}>⚠️ ¿Por qué esto no escala?</Text>
        <Text style={styles.warnText}>
          ScrollView crea las {tasks.length} vistas nativas al montar la pantalla, estén visibles o
          no. Con 1.000 tareas serían 1.000 vistas en memoria. FlatList, en cambio, solo mantiene
          las que ves (+ un margen) y recicla el resto. Usalo únicamente para contenido corto:
          formularios, pantallas de texto.
        </Text>
      </View>

      
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContent}
         
          showsVerticalScrollIndicator={false}
        >
          
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onPress={onSelect}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    gap: spacing.lg
  },
  header: {
    gap: spacing.sm
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted
  },
  warnCard: {
    backgroundColor: colors.dangerSoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    borderRadius: radius.sm,
    padding: spacing.lg,
    gap: spacing.xs
  },
  warnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.danger
  },
  warnText: {
    fontSize: 13,
    lineHeight: 19, 
    color: colors.ink
  },
  listContent: {
    paddingBottom: spacing.xl
  }
})