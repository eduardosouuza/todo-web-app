import { useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonInput } from './components/button-input';
import { Card } from './components/card';
import axios from 'axios';

interface Task {
  id: number;
  content: string;
  completed: boolean;
}

const taskSchema = z.object({
  task: z.string().min(1, 'Digite uma tarefa'),
});

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  // Buscar tarefas do backend na inicialização
  useEffect(() => {
    axios
      .get('http://localhost:5000/api.php')
      .then((response) => {
        setTasks(response.data);
        setCompletedTasks(response.data.filter((task: Task) => task.completed));
      })
      .catch((error) => console.error('Erro ao buscar tarefas:', error));
  }, []);

  // Adicionar nova tarefa no backend
  function handleSubmitTask(data: FieldValues) {
    const newTask: Omit<Task, 'id'> = {
      content: data.task,
      completed: false,
    };

    axios
      .post('http://localhost:5000/api.php', newTask)
      .then((response) => {
        setTasks([...tasks, response.data]); // Adiciona a nova tarefa retornada do backend
      })
      .catch((error) => console.error('Erro ao adicionar tarefa:', error));
  }

  // Alternar status de conclusão da tarefa no backend
  function handleCheckTask(id: number) {
    const updatedTask = tasks.find((task) => task.id === id);
    if (!updatedTask) return;

    const updatedStatus = !updatedTask.completed;

    axios
      .put(`http://localhost:5000/api.php?id=${id}`, { completed: updatedStatus })
      .then(() => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) task.completed = updatedStatus;
          return task;
        });

        setTasks(updatedTasks);
        setCompletedTasks(updatedTasks.filter((task) => task.completed));
      })
      .catch((error) => console.error('Erro ao atualizar tarefa:', error));
  }

  // Excluir tarefa do backend
  function handleDeleteTask(id: number) {
    axios
      .delete(`http://localhost:5000/api.php?id=${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        setCompletedTasks(updatedTasks.filter((task) => task.completed));
      })
      .catch((error) => console.error('Erro ao excluir tarefa:', error));
  }

  return (
    <div className="container mx-auto -mt-8 max-w-screen-lg space-y-16">
      <form className="space-y-2" onSubmit={handleSubmit(handleSubmitTask)}>
        <div className="flex w-full items-center gap-3">
          <input
            className="w-full rounded-lg border-none bg-zinc-50 p-4 text-lg text-zinc-950 outline-none ring-1 ring-zinc-400 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900 dark:ring-zinc-800"
            placeholder="O que você deseja fazer?"
            {...register('task')}
          />
          <ButtonInput type="submit" />
        </div>
        {errors.task && (
          <p className="absolute text-sm font-semibold text-red-500">
            Esse campo é obrigatório
          </p>
        )}
      </form>

      <section className="space-y-6">
        <article>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-zinc-950 dark:text-zinc-100">
                Tarefas criadas
              </p>

              <span className="flex items-center justify-center rounded-full bg-zinc-300/50 px-2 py-1 font-bold text-zinc-500 dark:bg-zinc-500/50 dark:text-zinc-300">
                {tasks.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold text-zinc-950 dark:text-zinc-100">
                Concluídas
              </p>

              <span className="flex items-center justify-center rounded-full bg-lime-500/50 px-2 py-1 font-bold text-lime-800 dark:bg-lime-800/50 dark:text-lime-500">
                {completedTasks.length}
              </span>
            </div>
          </div>
        </article>

        <article className="space-y-3">
          {tasks.length ? (
            tasks.map((task) => (
              <Card
                key={task.id}
                onDelete={() => handleDeleteTask(task.id)}
                onChange={() => handleCheckTask(task.id)}
                task={task.content}
                checked={task.completed}
              />
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-zinc-500">
              Nenhuma tarefa criada
            </p>
          )}
        </article>
      </section>
    </div>
  );
}
