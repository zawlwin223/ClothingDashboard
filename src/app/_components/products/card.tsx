export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4">
      {children}
    </div>
  )
}
