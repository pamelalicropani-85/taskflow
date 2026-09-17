import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native'

import { signIn } from '../../services/auth/authService'
import { colors, spacing, radius, shadow } from '../../theme'

type Props = {
  navigation: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState (false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    if (!email.trim() || !password) {
      setError('Completá email y contraseña')
      return
    }

    try {
      await signIn(email.trim(), password)
    } catch (error) {
      console.error(error)
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={colors.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? (<Text style={styles.error}>{error}</Text> ) : null}

      <Pressable 
      style={{...styles.button,opacity: loading ? 0.5: 1}} 
      onPress={handleLogin} 
      disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Ingresando...': 'Ingresar'}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>
          ¿No tenés una cuenta? Registrate
        </Text>
      </Pressable>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.canvas,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.ink,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.muted,
    marginBottom: spacing.xl,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.md,
    color: colors.ink,
    marginBottom: spacing.sm,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    boxShadow: shadow.raised,
  },

  buttonText: {
    color: colors.surface,
    fontWeight: '800',
  },

  link: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '600',
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
})