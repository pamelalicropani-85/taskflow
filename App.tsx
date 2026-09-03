import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import TabNavigator from './src/navigation/TabNavigator'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <TabNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
  
const styles = StyleSheet.create({  
  safe: {
    flex: 1,
  },
})