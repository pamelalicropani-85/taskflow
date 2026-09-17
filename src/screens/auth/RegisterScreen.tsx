import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native'

import { createAccount } from '../../services/auth/authService'
import { colors, spacing, radius, shadow } from '../../theme'

type Props = {
  navigation: any
}

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')

    if (!email.trim() || !password || !confirmPassword) {
      setError('Completá todos los campos')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await createAccount(email.trim(), password)
    } catch (error) {
      console.error(error)
      setError('No se pudo crear la cuenta')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Crear cuenta</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        placeholderTextColor={colors.muted}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          ¿Ya tenés una cuenta? Ingresá
        </Text>
      </Pressable>
    </View>
  )
}

export default RegisterScreen

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