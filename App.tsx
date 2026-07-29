import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';
import {colors} from './src/theme/colors'


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreen/>
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
