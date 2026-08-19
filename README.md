# TaskFlow

App de gestión de tareas hecha con Expo (React Native).

## Últimos cambios

### Pantalla principal: formulario de creación de tareas
`HomeScreen` pasó de ser una pantalla estática a un formulario funcional:

- Estado para `título`, `descripción` y `categoría` de la nueva tarea.
- Selector de categoría (`Trabajo`, `Estudio`, `Hogar`) con botones tipo chip.
- Validación en tiempo real:
  - El título debe tener al menos 3 caracteres.
  - La descripción debe tener al menos 10 caracteres.
  - Mensajes de error debajo de cada campo cuando no se cumplen.
- Botón "Agregar tarea" deshabilitado hasta que el título sea válido.
- Al agregar, se muestra un `Alert` de confirmación y la tarea se suma a la lista en memoria (`taskList`).
- El `Header` ahora recibe la cantidad total de tareas (`totalTasks`) en lugar de mostrarla de forma estática.

### Navegación / entrada de la app
- `App.tsx` ahora renderiza `HomeScreen` en vez de `ProfileScreen`.
- Se eliminó `src/screens/ProfileScreen.tsx` (ya no se usa).

### Tema (`src/theme/colors.ts`)
Se amplió la paleta de colores para soportar el nuevo formulario:

- Nuevos tokens: `surface`, `primary`, `secondary`, `text`, `textSecondary`, `success`, `danger`, `category`, `categorySelected`.

### Tipos (`src/types/index.ts`)
- Se agregó el campo `category: string` al tipo `Task`.

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Luego presioná `a` (Android) o `i` (iOS) para abrir la app en un emulador, o escaneá el QR con Expo Go en un dispositivo físico.
