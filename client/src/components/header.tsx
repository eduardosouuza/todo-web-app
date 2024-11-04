import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="flex h-48 items-center justify-center gap-4">
      <h1 className="text-4xl font-black text-zinc-500">
        Task <span className="text-zinc-950">Master</span>
      </h1>

      <ModeToggle />
    </header>
  )
}
