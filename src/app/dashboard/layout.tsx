interface LayoutProps {
  children: React.ReactNode
  monthlyIncome: number
  orders: number
  graph: any // Replace 'any' with a more specific type if known
}

export default function Layout({
  children,
  monthlyIncome,
  orders,
  graph,
}: LayoutProps) {
  return (
    <>
      <div className="mx-4">{children}</div>
      <div className="mx-4">{monthlyIncome}</div>
      <div className="mx-4">{graph}</div>
      <div className="mx-4">{orders}</div>
    </>
  )
}
