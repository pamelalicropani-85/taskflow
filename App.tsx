import { StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {colors} from './src/theme/colors'
import HomeScreen from './src/screens/HomeScreen';


export default function App() {

  return (
      <SafeAreaView style={styles.container}>
        <HomeScreen/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    padding:16,
    gap: 28
  },
  
  
  
});
