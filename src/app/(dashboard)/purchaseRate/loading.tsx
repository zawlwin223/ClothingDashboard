import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'

// Default values shown

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <TailChase size="40" speed="1.75" color="black" />
    </div>
  )
}
