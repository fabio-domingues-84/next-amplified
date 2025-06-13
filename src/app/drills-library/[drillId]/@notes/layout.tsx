import { NotesUILayerManager } from './ui/ui-layer-manager'

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      
      <NotesUILayerManager />
    </>
  )
}