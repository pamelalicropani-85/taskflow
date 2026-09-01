import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TabKey } from '../types'
import { colors, radius, spacing } from '../theme'

type Props = {
  active: TabKey
  onChange: (tab: TabKey) => void
}
const TABS: Array<{ key: TabKey; icon: string; label: string }> = [
  { key: 'flatlist', icon: '⚡', label: 'FlatList' },
  { key: 'scrollview', icon: '🐢', label: 'ScrollView' }
]

export default function TabBar({ active, onChange }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active

        return (
          <TouchableOpacity  key={tab.key} style={[styles.tab, isActive && styles.tabActive]}onPress={() => onChange(tab.key)} activeOpacity={0.8}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {flexDirection: 'row',
    backgroundColor: colors.dark,
    borderRadius: radius.lg, padding: spacing.xs,
    gap: spacing.xs
  },
  tab: {  flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm - 2,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md
  },
  tabActive: {
    backgroundColor: colors.primary
  },
  icon: {
    fontSize: 14
  },
  label: {
    fontSize: 13,
    fontWeight: '700',   color: 'rgba(255,255,255,0.55)'
  },
  labelActive: {
    color: colors.surface 
  }
})