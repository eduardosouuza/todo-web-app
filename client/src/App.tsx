import React, { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css"; // Aqui mantém o arquivo de estilos
import { IoMdTrash } from "react-icons/io";

// Definindo o tipo para as tarefas
interface Task {
  id: number;
  task: string;
  completed: boolean;
  subtask?: boolean;
}

const tasksData: Task[] = [
  { id: 1, task: "Bora bill", completed: true },
  { id: 2, task: "Amostradinho", completed: false },
  { id: 3, task: "Comer", completed: false, subtask: true },
  { id: 4, task: "Beber Agua", completed: false, subtask: true },
  { id: 5, task: "Fazer Paper", completed: false },
  { id: 6, task: "Academia", completed: false }
];

interface TaskProps {
  task: string;
  completed: boolean;
  toggleTask: () => void;
  removeTask: () => void; // Nova função para remover a tarefa
}

const Task: React.FC<TaskProps> = ({ task, completed, toggleTask, removeTask }) => {
  return (
    <div className="task">
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={toggleTask} 
      />
      <span className={completed ? "completed" : ""}>{task}</span>
      <button onClick={removeTask} className="delete-task">
        <IoMdTrash className="icon" /> {/* Ícone de lixeira */}
      </button>
    </div>
  );
};

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [newTask, setNewTask] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const toggleTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskItem: Task = {
      id: tasks.length + 1,
      task: newTask,
      completed: false
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  // Função para remover tarefa
  const removeTask = (taskId: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  // Atualiza a data atual
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', // Dia da semana completo
        day: 'numeric',   // Dia em número
        year: 'numeric',  // Ano
        month: 'long',    // Mês em texto completo
      };
      
      const formattedDate = now.toLocaleDateString('pt-BR', options);
      const day = now.getDate(); // Dia do mês
      const year = now.getFullYear(); // Ano
      const weekDay = now.toLocaleDateString('pt-BR', { weekday: 'long' }); // Dia da semana em português
      const month = now.toLocaleDateString('pt-BR', { month: 'long' }).split(' ')[0]; // Nome do mês

      // Formatação final sem o "de"
      setCurrentDate(`${weekDay}, ${day} ${month} ${year}`);
    };

    updateDate(); // Atualiza a data imediatamente ao montar o componente
    const intervalId = setInterval(updateDate, 1000); // Para atualizar se necessário

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div className="todo-container">
      <h3>{currentDate}</h3> {/* Data atual no formato desejado */}
      <h2>To Do List</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task.task}
            completed={task.completed}
            toggleTask={() => toggleTask(task.id)}
            removeTask={() => removeTask(task.id)} // Passa a função de remoção
          />
        ))}
      </div>

      {/* Input para adicionar novas tarefas */}
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Nova tarefa..." 
      />
      <button className="add-task" onClick={addTask}>Adicionar</button>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app-container">
        <ModeToggle />
        <ToDoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
