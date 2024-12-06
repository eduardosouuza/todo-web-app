import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="flex h-48 items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center p-6">
        <div className="flex w-full justify-end">
          <ModeToggle />
        </div>

        <h1 className="text-4xl font-black text-zinc-500">
          Task <span className="text-zinc-950 dark:text-zinc-100">Master</span>
        </h1>
      </div>
    </header>
  )
}
