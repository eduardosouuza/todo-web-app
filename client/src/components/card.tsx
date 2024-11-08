import clsx from 'clsx'
import { Trash2 } from 'lucide-react'

interface CardProps {
  task: string
  onDeletedTask?: (id: number) => void
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

export function Card({ task, onDelete, checked, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-3 rounded-lg bg-zinc-200 p-4 text-sm text-zinc-950 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900/70',
        checked && 'bg-transparent ring ring-zinc-500 dark:ring-zinc-800',
      )}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          className="size-5 cursor-pointer rounded-full border-none text-lime-500 outline-none focus:ring-0"
          {...props}
        />
        <p className={clsx(checked && 'text-zinc-500 line-through')}>{task}</p>
      </div>
      <button onClick={onDelete}>
        <Trash2 className="size-5 text-zinc-500 duration-200 hover:text-red-500" />
      </button>
    </div>
  )
}
