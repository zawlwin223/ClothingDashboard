'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { ReactNode } from 'react'

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  //   const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Transparent Untouchable Background */}
        <div className="fixed inset-0 bg-black/50  pointer-events-none"></div>

        {/* Modal Content */}
        <div className="relative z-50 w-[90%] max-w-md bg-white rounded-xl p-6 shadow-lg">
          <button
            onClick={() => onClose()}
            className="absolute top-3 right-3 text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
          {children}
        </div>
        {/* {children} */}
      </div>
    </>
  )
}
