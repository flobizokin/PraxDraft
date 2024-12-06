import StackNotes from '@/components/StackNotes'

export default function StackPage({ params }: { params: { stack: string } }) {
  return (
    <div className="p-4">
      <StackNotes stackName={decodeURIComponent(params.stack)} />
    </div>
  )
}

