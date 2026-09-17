import { useEffect } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { NavigationContainer } from "@react-navigation/native";
import { auth } from '../config/firebase'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectAuthLoading,
  selectCurrentUser,
  setUser,
  setUserPhoto,
} from '../features/auth/authSlice'

import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'
import { getUserProfile } from '../services/profile/profileService';

const RootNavigator = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectCurrentUser)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: null
          })
        )

      try{
        const profile = await getUserProfile(user.uid)
        if (profile ?.photoURL){
          dispatch(setUserPhoto(profile.photoURL))
        }
      } catch (err){
        Alert.alert("Error","No se pudo obtener el perfil.")
      } 
      } else {
        dispatch(setUser(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootNavigator