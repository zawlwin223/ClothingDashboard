interface LayoutProps {
  children: React.ReactNode
  // monthlyIncome: number
  ordersTable: any
  ordersGraph: any // Replace 'any' with a more specific type if known
}

export default function Layout({
  children,
  ordersTable,
  ordersGraph,
}: LayoutProps) {
  return (
    <div className="w-full p-3">
      <div className="mx-4">{children}</div>

      <div className="mx-4">{ordersGraph}</div>
      <div className="mx-4">{ordersTable}</div>
    </div>
  )
}
