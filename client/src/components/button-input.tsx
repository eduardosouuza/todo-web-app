import { PlusCircle } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

export function ButtonInput({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex h-full gap-3 rounded-lg bg-zinc-400 px-6 py-4 font-bold text-white ring ring-zinc-400 hover:bg-zinc-400/70 hover:ring-zinc-400/70 focus:ring-2 focus:ring-zinc-600"
    >
      Criar <PlusCircle />
    </button>
  )
}
