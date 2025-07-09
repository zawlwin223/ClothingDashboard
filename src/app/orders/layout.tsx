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

      <div className="mx-4 bg-white p-5 my-4 border border-gray-300 rounded-[10px]">
        <h1 className="font-bold ms-5 text-[30px]">Purchase Rate</h1>
        <p className="mb-5 ms-5 text-gray-400">
          A visual summary of sales activities
        </p>
        {ordersGraph}
      </div>
      <div className="mx-4">{ordersTable}</div>
    </div>
  )
}
