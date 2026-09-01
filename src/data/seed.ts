import type { DemoTask } from '../types'


const raw: Array<[string, string, DemoTask['category'], DemoTask['date'], boolean]> = [
  ['Sacar turno con el dentista', 'Agustín primer control', 'personal', 'today', false],
  ['Pagar la luz', 'Mes de Agosto', 'hogar', 'today', true],
  ['Bañar al perro', 'Turno viernes 13 hs.', 'personal', 'tomorrow', false],
  ['Pagar cuota del colegio', '10% más', 'personal', 'today', false],
  ['Repasar para el parcial de inglés', 'Unidades 3 y 4 del libro', 'estudio', 'tomorrow', false],
  ['Terminar el trabajo de React', 'Falta la entrega final', 'estudio', 'nextWeek', false],
  ['Comprar pan', 'Ir a la panadería a comprar 1kg de pan', 'hogar', 'today', true],
  ['Comprar leche', 'Dos litros en el supermercado', 'hogar', 'today', false],
  ['Comprar huevos', 'Una docena', 'hogar', 'tomorrow', false],
  ['Sacar la basura', 'Antes de las 21hs', 'hogar', 'today', false],
  ['Llamar a mamá', 'Preguntarle cómo salió el estudio', 'personal', 'today', false],
  ['Turno con el dentista', 'Pedirlo por la app de la obra social', 'personal', 'tomorrow', false],
  ['Ir al gimnasio', 'Rutina de piernas', 'personal', 'today', false],
  ['Renovar la SUBE', 'Cargarla antes del lunes', 'personal', 'nextWeek', false]
]
export const SEED_TASKS: DemoTask[] = raw.map(([title, description, category, date, completed], i) => ({
  id: `seed-${i + 1}`,
  title,
  description,
  category,
  date,
  completed
}))