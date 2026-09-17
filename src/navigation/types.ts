import type { NavigatorScreenParams } from '@react-navigation/native'

export type TaskStackParamList = {
  Tasks: undefined
  TaskDetail: {
    taskId: string
  }
}

export type ProfileStackParamList = {
  Profile: undefined
}

export type TabParamList = {
  TasksStack: NavigatorScreenParams<TaskStackParamList>
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>
}

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}