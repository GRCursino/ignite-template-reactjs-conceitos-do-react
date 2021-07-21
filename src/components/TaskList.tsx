import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    
    if(!newTaskTitle){
      return;
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, newTask]); // deste modo com o spread-operator "..." eu salvo um novo estado com os valores que tasks ja possuía mais o newTask.
    setNewTaskTitle('');    
  }

  function handleToggleTaskCompletion(id: number) {
    
    const completedTask = tasks.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete
    } : task);

    setTasks(completedTask);

    // Com o map eu percorro cada task para verificar qual a task tem o mesmo id que veio como parametro para encontrar a task desejada,
    // com a task encontrada, através do spread-operator eu pego a task com o mesmo id do parametro, e nego com "!" sua propriedade isCompleted,
    // assim eu mudo o que era false para true e marcando a checkbox, e clicando novamente transformo true para false desmarcando a checkbox.

  }

  function handleRemoveTask(id: number) {
    
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);

    // desta forma ele filtra todo o array deixando os itens que nao tem o id que veio como parametro,
    // automaticamente remove o item que foi passado o id no parametro da função.                                                          
  }                                                              

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}