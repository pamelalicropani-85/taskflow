import type {Task} from '../types'

export const tasks: Task[] =[
    {
      id: '1',
      title: 'Pagar la luz',
      description: 'Descargar la boleta de la aplicacion',
      time: 'today',
      category: 'Hogar',
      done: false
    },
    {
      id: '2',
      title: 'Ir al supermercado',
      description: 'Hacer una lista de las cosas que hay que comprar',
      time: 'tomorrow',
      category: 'Hogar',
      done: true
    },
    {
      id: '3',
      title: 'Regar las plantas',
      description: 'Regar solo las plantas que estan en el patio',
      time: 'week',
      category: 'Hogar',
      done: false
    },
    {
      id: '4',
      title: 'Pedir la comida del perro',
      description: 'Llamar a la veterinaria para encargar el alimento balanceado',
      time: 'today',
      category: 'Hogar',
      done: true
    },
]

export const name = 'Pamela Licropani'