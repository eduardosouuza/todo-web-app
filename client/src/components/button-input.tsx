import { PlusCircle } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

export function ButtonInput({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex h-full gap-3 rounded-lg bg-zinc-400 px-6 py-4 font-bold text-zinc-50 ring ring-zinc-400 hover:bg-zinc-400/70 hover:ring-zinc-400/70 focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-800 dark:ring-zinc-800 dark:hover:bg-zinc-800/70 dark:hover:ring-zinc-800/70"
    >
      Criar <PlusCircle />
    </button>
  )
}
