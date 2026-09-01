  export type Task ={
    id:string
    title: string
    done:  boolean
    description: string
    category: string
    time: 'today'|'tomorrow'|'week'|'month'
  }

  export type Category = 'personal' | 'hogar' | 'estudio'

  export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string; soft: string }> = {
    personal: { label: 'Personal', emoji: '🧍', color: '#c97b63ff', soft: '#f3ddd6ff' },
    hogar: { label: 'Hogar', emoji: '🏠', color: '#4f9e8fff', soft: '#dcefeaff' },
    estudio: { label: 'Estudio', emoji: '📚', color: '#5b7fc7ff', soft: '#dfe6f7ff' }
  }

  export type DueDate = 'today' | 'tomorrow' | 'nextWeek'

  export const DUE_DATES: Record<DueDate, string> = {
    today: 'Hoy',
    tomorrow: 'Mañana',
    nextWeek: 'Próxima semana'
  }

  export type DemoTask = {
    id: string
    title: string
    description: string
    category: Category
    date: DueDate
    completed: boolean
  }

  export const createId = () => Math.random().toString(36).slice(2, 10)

  export type TabKey = 'flatlist' | 'scrollview'