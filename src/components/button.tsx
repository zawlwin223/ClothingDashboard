type ActionType = string
import { useTransition } from 'react'
import { deleteProduct } from '@/action/product'
import Link from 'next/link'

interface ActionButtonProps {
  id: string
  image_id?: string
  type: ActionType
  children?: React.ReactNode
}
export default function LinkButton({
  image_id,
  id,
  children,
  type,
  ...rest
}: ActionButtonProps) {
  let className = 'mt-2 mr-1 px-4 py-2 text-white rounded-lg transition'

  if (type === 'edit') {
    className += ' bg-blue-500 hover:bg-blue-600'
  } else if (type === 'delete') {
    className += ' bg-red-500 hover:bg-red-600'
  } else {
    className += ' bg-gray-500 hover:bg-gray-600'
  }

  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (image_id !== undefined) {
      startTransition(() => {
        deleteProduct(id, image_id)
      })
    }
  }

  if (type === 'edit') {
    return (
      <Link href={`/products/${id}`} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button className={className} onClick={handleDelete} {...rest}>
      {isPending ? <span className="animate-spin">Loading...</span> : children}
    </button>
  )
}
