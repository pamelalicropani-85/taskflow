import type {Task} from '../types'

export const tasks: Task[] =[
    {
      id: '1',
      title: 'Pagar la luz',
      description: 'Descargar la boleta de la aplicacion',
      date: 'today',
      category: 'hogar',
      completed: false
    },
    {
      id: '2',
      title: 'Ir al supermercado',
      description: 'Hacer una lista de las cosas que hay que comprar',
      date: 'tomorrow',
      category: 'hogar',
      completed: true
    },
    {
      id: '3',
      title: 'Regar las plantas',
      description: 'Regar solo las plantas que estan en el patio',
      date: 'nextWeek',
      category: 'hogar',
      completed: false
    },
    {
      id: '4',
      title: 'Pedir la comida del perro',
      description: 'Llamar a la veterinaria para encargar el alimento balanceado',
      date: 'today',
      category: 'hogar',
      completed: true
    },
]

export const name = 'Pamela Licropani'