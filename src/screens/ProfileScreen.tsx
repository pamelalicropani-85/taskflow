import { View, StyleSheet } from 'react-native'
import ProfileCard from '../components/ProfileCard'
import { name } from '../data'
import { colors } from '../constants/colors'

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <ProfileCard
                name={name}
                role="Desarrolladora Frontend"
                image="https://i.pravatar.cc/150?img=47"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: colors.background,
    },
})

export default ProfileScreen
