interface LayoutProps {
  children: React.ReactNode
  monthlyIncome: number
  ordersTable: number
  ordersGraph: any // Replace 'any' with a more specific type if known
}

export default function Layout({
  children,
  monthlyIncome,
  ordersTable,
  ordersGraph,
}: LayoutProps) {
  return (
    <>
      <div className="mx-4">{children}</div>
      <div className="mx-4">{monthlyIncome}</div>
      <div className="mx-4">{ordersGraph}</div>
      <div className="mx-4">{ordersTable}</div>
    </>
  )
}
