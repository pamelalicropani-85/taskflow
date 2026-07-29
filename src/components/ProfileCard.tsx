import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

type ProfileCardProps = {
    name: string
    role: string
    image: string
}

const ProfileCard = ({ name, role, image }: ProfileCardProps) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    info: {
        gap: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    role: {
        fontSize: 14,
        color: colors.primary,
    },
})

export default ProfileCard
