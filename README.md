# TaskFlow

# Taskflow

Aplicación móvil desarrollada con **React Native**, **Expo** y **React Navigation** para gestionar tareas.

## 📱 Funcionalidades

* Visualización de una lista de tareas.
* Consulta del detalle de cada tarea.
* Creación de nuevas tareas.
* Navegación entre las diferentes pantallas.

## 🧭 Navegación

La aplicación utiliza un `BottomTabNavigator` con las siguientes rutas:

* **Home**
* **Profile**

Dentro de **Home** se utiliza un `NativeStackNavigator`:

```text id="h7k2m9"
Home
├── TaskList
├── TaskDetail
└── TaskForm
```

Al seleccionar una tarea, se navega a `TaskDetail` enviando el ID correspondiente. Después de guardar una nueva tarea, la aplicación regresa a `TaskList`.

## 🛠️ Tecnologías utilizadas

* React Native
* Expo
* React Navigation
* Native Stack Navigator
* Bottom Tab Navigator

## 🚀 Instalación

```bash id="p4w8x2"
npm install
npx expo start
```
