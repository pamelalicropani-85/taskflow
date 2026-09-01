import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '../theme'

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🗒️</Text>
      <Text style={styles.title}>¡No tienes tareas pendientes! Empieza por crear una arriba.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center'
  }
})