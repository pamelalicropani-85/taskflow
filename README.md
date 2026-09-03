# TaskFlow

# Taskflow

Aplicación móvil desarrollada con **React Native**, **Expo**, **React Navigation** y **Redux Toolkit** para gestionar tareas.

## 📱 Funcionalidades

* Visualización de una lista de tareas.
* Filtrado global de tareas (Todas / Pendientes / Completadas), persistente entre pestañas.
* Consulta del detalle de cada tarea.
* Creación de nuevas tareas.
* Marcar una tarea como completada/pendiente y eliminarla desde el detalle.
* Navegación entre las diferentes pantallas.

## 🗃️ Estado global (Redux Toolkit)

El estado de las tareas vive en un store centralizado con **Redux Toolkit**, en vez de estado local por pantalla:

```text id="r3d5x1"
src/store
├── store.ts       # configureStore
├── hooks.ts       # useAppDispatch / useAppSelector tipados
└── tasksSlice.ts  # createSlice "tasks"
```

El slice `tasks` mantiene `{ items, filter }` y expone las acciones `addTask`, `toggleTaskStatus`, `deleteTask` y `setFilter`. Las pantallas de lista, detalle y formulario se conectan al store con `useSelector`/`useDispatch` en lugar de recibir props o manejar `useState` propio.

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
* Redux Toolkit (`@reduxjs/toolkit`)
* React Redux (`react-redux`)

## 🚀 Instalación

```bash id="p4w8x2"
npm install
npx expo start
```
