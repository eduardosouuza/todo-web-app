import { useState, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonInput } from './components/button-input'
import { Card } from './components/card'

interface Task {
  id: number
  content: string
  completed: boolean
}

const taskSchema = z.object({
  task: z.string().min(1, 'Digite uma tarefa'),
})

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  })

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks)
      setTasks(parsedTasks)
      setCompletedTasks(parsedTasks.filter((task) => task.completed))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  function handleSubmitTask(data: FieldValues) {
    const newTask: Task = {
      id: tasks.length + 1,
      content: data.task,
      completed: false,
    }

    setTasks([...tasks, newTask])
  }

  function handleCheckTask(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed
      }
      return task
    })

    setTasks(updatedTasks)
    setCompletedTasks(updatedTasks.filter((task) => task.completed))
  }

  function handleDeleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    setCompletedTasks(updatedTasks.filter((task) => task.completed))
  }

  return (
    <div className="container mx-auto -mt-8 max-w-screen-lg space-y-16">
      <form className="space-y-2" onSubmit={handleSubmit(handleSubmitTask)}>
        <div className="flex w-full items-center gap-3">
          <input
            className="w-full rounded-lg border-none bg-zinc-50 p-4 text-lg text-zinc-950 outline-none ring-1 ring-zinc-400 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900"
            placeholder="O que você deseja fazer?"
            {...register('task')}
          />
          <ButtonInput type="submit" />
        </div>
        {errors.task && (
          <p className="absolute text-sm font-semibold text-red-500">
            Esse campo é obrigatorio
          </p>
        )}
      </form>

      <section className="space-y-6">
        <article>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-zinc-950 dark:text-zinc-100">Tarefas criadas</p>
              <span className="flex items-center justify-center rounded-full bg-zinc-300/50 px-2 py-1 font-bold text-zinc-500 dark:text-zinc-300 dark:bg-zinc-500/50">
                {tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-zinc-950 dark:text-zinc-100">Concluídas</p>
              <span className="flex items-center justify-center rounded-full bg-lime-500/50 px-2 py-1 font-bold text-lime-800 dark:text-lime-500 dark:bg-lime-800/50">
                {completedTasks.length}
              </span>
            </div>
          </div>
        </article>
        <article className="space-y-3">
          {tasks.length ? (
            <>
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  onDelete={() => handleDeleteTask(task.id)}
                  onChange={() => handleCheckTask(task.id)}
                  task={task.content}
                  checked={task.completed}
                />
              ))}
            </>
          ) : (
            <div>
              <p className="text-center text-lg font-semibold text-zinc-500">
                Nenhuma tarefa criada
              </p>
            </div>
          )}
        </article>
      </section>
    </div>
  )
}
