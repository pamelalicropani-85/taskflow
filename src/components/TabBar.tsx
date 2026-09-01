import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { TabKey } from '../types'
import { colors, radius, spacing } from '../theme'

type Props = {
  active: TabKey
  onChange: (key: TabKey) => void
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'flatlist', label: 'FlatList' },
  { key: 'scrollview', label: 'ScrollView' }
]

export default function TabBar({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.8}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    gap: 4
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center'
  },
  tabActive: {
    backgroundColor: colors.primary
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted
  },
  tabTextActive: {
    color: colors.surface
  }
})
