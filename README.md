# TaskFlow

Aplicación móvil desarrollada con **React Native**, **Expo**, **React Navigation**, **Redux Toolkit** y **Firebase** (Auth + Firestore) para gestionar tareas.

## 📱 Funcionalidades

* Registro e inicio de sesión con **Firebase Authentication** (email/contraseña).
* Visualización de una lista de tareas sincronizada en tiempo real con **Firestore**.
* Filtrado global de tareas (Todas / Pendientes / Completadas), persistente entre pestañas.
* Consulta del detalle de cada tarea.
* Creación de nuevas tareas.
* Marcar una tarea como completada/pendiente y eliminarla desde el detalle.
* Perfil de usuario con selección y actualización de foto desde la galería (**expo-image-picker**), persistida en Firestore.
* Cierre de sesión.
* Navegación entre las diferentes pantallas, condicionada al estado de autenticación.

## 🗃️ Estado global (Redux Toolkit)

El estado vive en un store centralizado con **Redux Toolkit**, organizado por features:

```text id="r3d5x1"
src/store
├── index.ts        # configureStore
└── hooks.ts         # useAppDispatch / useAppSelector tipados

src/features
├── auth/authSlice.ts   # createSlice "auth": usuario actual y estado de carga
└── tasks/tasksSlice.ts # createSlice "tasks": { items, filter }
```

El slice `auth` mantiene `{ user, isLoading }`, sincronizado con `onAuthStateChanged` de Firebase. El slice `tasks` mantiene `{ items, filter }` y expone las acciones `addTask`, `toggleTaskStatus`, `deleteTask`, `setTasks` y `setFilter`. Las pantallas se conectan al store con `useAppSelector`/`useAppDispatch` en lugar de recibir props o manejar `useState` propio.

## ☁️ Firebase

`src/config/firebase.ts` inicializa la app de Firebase. Los servicios están separados por dominio:

* `services/auth/authService.ts` — `createAccount`, `signIn`, `logout` (Firebase Auth).
* `services/tasks/tasksService.ts` — `createTask`, `subscribeToTasks` (suscripción en tiempo real), actualización y borrado en Firestore, filtradas por `userId`.
* `services/profile/profileService.ts` — `getUserProfile`, `updateUserPhoto` para la foto de perfil en Firestore.

## 🧭 Navegación

La navegación raíz (`RootNavigator`) muestra `AuthStack` o `TabNavigator` según haya o no un usuario autenticado:

```text id="h7k2m9"
RootNavigator
├── AuthStack (sin sesión)
│   ├── Login
│   └── Register
└── TabNavigator (con sesión)
    ├── TasksStack
    │   ├── Tasks       # lista + formulario de creación
    │   └── TaskDetail
    └── ProfileStack
        └── Profile
```

Al seleccionar una tarea, se navega a `TaskDetail` enviando el ID correspondiente.

## 🛠️ Tecnologías utilizadas

* React Native
* Expo
* React Navigation (Native Stack + Bottom Tabs)
* Redux Toolkit (`@reduxjs/toolkit`) y React Redux (`react-redux`)
* Firebase (`firebase`, `@firebase/auth`) — Authentication y Firestore
* Expo Image Picker (`expo-image-picker`)
* Async Storage (`@react-native-async-storage/async-storage`)

## 🚀 Instalación

```bash id="p4w8x2"
npm install
npx expo start
```
## 🔗 Repositorio

https://github.com/pamelalicropani-85/taskflow

## 📦 Publicación (versión funcional)

* **APK instalable (descarga directa, sin necesidad de cuenta de Expo)**: https://expo.dev/artifacts/eas/4V6cvWm3x6nn_s8xlZh9ldbix1V8c5V6nBytkT21ZPU.apk
* **Página del build** (logs y detalle, también accesible sin cuenta): https://expo.dev/accounts/pamela85/projects/taskflow/builds/7b9753a1-9768-4258-9543-adb527dc2651
* **EAS Update** (canal `production`, requiere cuenta de Expo con acceso al proyecto para ver el detalle): https://expo.dev/accounts/pamela85/projects/taskflow/updates/19a89803-797c-4685-9def-31e4fd10bc3e

## URL Expo 

https://expo.dev/accounts/pamela85/projects/taskflow

> Nota: esta página del proyecto y la del update de arriba requieren iniciar sesión en una cuenta de Expo con acceso. Para instalar y probar la app sin cuenta, usar el APK de la sección anterior.

## Emulador

https://github.com/user-attachments/assets/30cbfde6-d81b-4807-a528-d65c6efa11a1



