import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native'
import {   name } from '../data'
import Header from '../components/Header'
import CardTask from '../components/CardTask'
import {colors, textSize} from '../theme'
import { useState } from 'react'
import type { Task } from '../types'  

const categories = ['Trabajo', 'Estudio', 'Hogar'] as const

const HomeScreen = () => {
  const [taskList, setTaskList] = useState<Task[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>(
    categories[0]
  )  
  const [titleError, setTitleError] = useState('')  
  const [descriptionError, setDescriptionError] = useState('')

  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)

  const isButtonDisabled = title.trim().length < 3

  const handleAddTask = () => {
    let valid = true

    setTitleError('')
    setDescriptionError('')
    
    if (title.trim().length < 5) {
      setTitleError('El título debe tener al menos 5 caracteres')
      valid = false
    }

    if (description.trim().length < 10) {
      setDescriptionError('La descripción debe tener al menos 10 caracteres')
      valid = false
    }

    if (!valid) {
      return
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      done: false,
      category,
      time: 'today'
    }

    console.log(newTask)

    setTaskList((prev) => [newTask, ...prev])

    Alert.alert('Tarea agregada', 'La tarea ha sido agregada.')

    setTitle('')
    setDescription('')
    setCategory(categories[0])
  }
  return (
    <>
       { /*<View style={styles.gretting}>
            <Text style={styles.grettingText}>Hola, buenas noches {name.slice(0,6)}</Text>
        </View>*/}
        <Header name ={name} totalTasks={taskList.length} />
        <View style={styles.form}>
            <Text style={styles.formTitle}>Crear una nueva tarea</Text>

            <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder='Título'
            autoCapitalize='sentences'
            onFocus={()=> setTitleFocused (true)}
            onBlur={()=> setTitleFocused (false)}
            style={[
              styles.input,
              titleFocused && styles.inputFocused,
              titleError && styles.inputError
            ]} // titulo del input
        />  

        {titleError && <Text style={styles.error}>{titleError}</Text> }

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder='Descripción'
            multiline
            autoCapitalize='sentences'
            onFocus={()=> setDescriptionFocused (true)}
            onBlur={()=> setDescriptionFocused (false)}
            style={[
              styles.input,
              descriptionFocused && styles.inputFocused,
              descriptionError && styles.inputError
            ]} // descripcion del input
        />  
          {descriptionError && <Text style={styles.error}>{descriptionError}</Text> } 


            <Text style={styles.categoryTitle}>Categoría</Text>

        <View style={styles.categories}>
            {categories.map((item)=>(
              <Pressable
              key={item}
              onPress={()=> setCategory(item)}
              style={[
                styles.categoryButton,
                category === item && styles.categoryButtonSelected
              ]}
              >
                <Text 
                style={[
                  styles.categoryText,
                  category === item && styles.categoryTextSelected
                ]}>{item}</Text>
              </Pressable>
            ))} 
        </View> 
            
        <Pressable
            disabled={isButtonDisabled}
            onPress={handleAddTask}
            style={({pressed}) => [
              styles.button,
              isButtonDisabled && styles.buttonDisabled,
              pressed && !isButtonDisabled && styles.buttonPressed
            ]}

        >
            <Text style={styles.buttonText}>Agregar tarea</Text>
        </Pressable>
          
            
        </View>
       {/* <Text>Input del usuario: {textUserInput}</Text>
        <View style={{width:'100%', alignItems:'flex-start' }}>
            <Text style={{fontSize: textSize.subtitle}}>Tareas completadas {tasks.filter(task => task.done).length} / {tasks.length}</Text>
        </View>
        <View style={{width:'100%', gap: 16}}>
            {tasks.map((task)=>{
              return(
                <CardTask key= {task.id} task={task} />
              )
            })} 
        </View>*/}
    </>        
  )
}

const styles = StyleSheet.create ({
    container:{
    padding: 20,
    gap: 20,
    backgroundColor: colors.backgroundColor  
  },

  gretting:{
    width: '100%'
  },

  grettingText:{
    fontSize: 26,
    fontWeight: '600',
    color: colors.text
  },

  form:{
    backgroundColor : colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12
  },

  formTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text
  },

  input:{
    borderWidth: 1,
    borderColor: '#ebc3c3ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    color: colors.text
  },

  inputFocused:{
    borderColor: colors.primary
  },

  inputError:{
    borderColor: colors.danger    
  },

  textArea:{
    minHeight: 80,
    textAlignVertical: 'top'  
  },

  error:{
    color: colors.danger,
    marginTop: -4,
  },

  categoryTitle:{
    fontSize: 18,
    fontWeight: '600',
    color: colors.text
  },

  categories:{
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },

  categoryButton:{
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ebc3c3ff',
    backgroundColor: colors.category
  },

  categoryButtonSelected:{
    backgroundColor: colors.categorySelected,
    borderColor: colors.primary
  },
  
  categoryText:{
    color: colors.primary,
    fontSize: 14
  },

  categoryTextSelected:{
    color: '#fff'
  },

  button:{
    backgroundColor: colors.primary,
    paddingVertical: 12,  
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center'
  },

  buttonDisabled:{
    backgroundColor: '#cccccc'
  },

  buttonPressed:{
    opacity: 0.8
  },
  
  buttonText:{  
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  section:{
    width: '100%'
  },

  sectionTitle:{
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },

  taskContainer:{
    gap: 16,
    paddingBottom: 16
  }

})

export default HomeScreen