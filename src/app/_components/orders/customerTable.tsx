// 'use client'

// import { useState } from 'react'
// import React from 'react'
// import { fetchOrders } from '@/app/_hook/fetchOrders'
// import { paginate } from '@/app/_utils/pagination'
// import PaginationButton from '../paginationButton'

// export default function OrdersTable() {
//   const [expanded, setExpanded] = useState<string | null>(null)
//   const [page, setPage] = useState(1) // State to manage current page

//   const { data: orders, isLoading, isError } = fetchOrders()
//   const arrayFormOrders = Object.entries(orders ?? {}).map(([id, data]) => ({
//     id,
//     ...(typeof data === 'object' && data !== null ? data : {}),
//   }))

//   if (isLoading) return <div className="p-4">Loading...</div>
//   if (isError)
//     return <div className="p-4 text-red-500">Error loading orders</div>

//   const [paginatedOrders, totalPageRaw] = paginate(arrayFormOrders, page, 5)
//   const totalPage = typeof totalPageRaw === 'number' ? totalPageRaw : 1

//   return (
//     <div className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-md">
//       <h1 className="font-semibold text-[20px]">Order History</h1>
//       <p className="mb-3 mt-2 text-gray-500">
//         Review details of all customer orders.
//       </p>
//       <input
//         type="text"
//         placeholder="Filter By Customer Name"
//         className="my-3 p-2 w-[300px] bg-gray-200 border-0 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400"
//       />
//       <div className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
//         <table className="table-auto w-full">
//           <thead>
//             <tr className="text-left">
//               <th className="p-3 text-gray-500">Date</th>
//               <th className="p-3 text-gray-500">Name</th>
//               <th className="p-3 text-gray-500">Email</th>
//               <th className="p-3 text-gray-500 text-center">City</th>
//               <th className="p-3 text-gray-500 text-center">Total</th>
//               {/* <th className="p-3 text-gray-500 text-center">Action</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(paginatedOrders!).map(([key, order]) => {
//               const typedOrder = order as Order
//               console.log('Order:', typedOrder)
//               return (
//                 <React.Fragment key={key}>
//                   <tr key={`${key}-order`} className="border-t border-gray-300">
//                     <td className="px-4 py-2 text-gray-500">
//                       {typedOrder.date}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500">
//                       {typedOrder.customer.fullName}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500">
//                       {typedOrder.customer.email}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500">
//                       {typedOrder.customer.city}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500">
//                       {typedOrder.totalPrice}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500">
//                       <button
//                         onClick={() =>
//                           setExpanded((prev) => (prev === key ? null : key))
//                         }
//                         className="bg-blue-500 text-white px-3 py-1 rounded">
//                         {expanded === key ? 'Hide' : 'Check'}
//                       </button>
//                     </td>
//                   </tr>
//                   {expanded === key && (
//                     <tr key={`${key}-item`}>
//                       <td colSpan={5} className="bg-gray-50 border px-4 py-2">
//                         <div className="space-y-4">
//                           {typedOrder.items.map((item, idx) => (
//                             <div key={idx} className="flex items-center gap-4">
//                               <img
//                                 src={item.image.url}
//                                 alt="product"
//                                 className="w-16 h-16 object-cover border"
//                               />
//                               <div>
//                                 <p className="font-semibold">
//                                   {item.title ?? 'Unnamed Product'}
//                                 </p>
//                                 <p>
//                                   Size: {item.size} | Quantity: {item.quantity}{' '}
//                                   | Price: ${item.price}
//                                 </p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//       <PaginationButton setPage={setPage} page={page} totalPage={totalPage} />
//     </div>
//   )
// }

'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { fetchOrders } from '@/app/_hook/fetchOrders'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// interface OrderItem {
//   id: number
//   title?: string
//   price: number
//   quantity: number

//   size: string
//   image: {
//     url: string
//     alt?: string
//   }
// }

export type Customer = {
  fullName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  // date: string
}

export type Order = {
  id: string
  date: string
  customer: Customer
  items: any[]
  totalPrice: string
}

// interface Order {
//   id: string
//   date: string
//   customer: Customer
//   items: OrderItem[]
//   totalPrice: string
// }

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div className="lowercase">{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'customer.fullName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.customer.fullName}</div>
    ),
  },
  {
    accessorKey: 'customer.email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.customer.email}</div>
    ),
  },
  {
    accessorKey: 'customer.city',
    header: 'City',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.customer.city}</div>
    ),
  },
  {
    accessorKey: 'customer.address',
    header: 'Address',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.customer.address}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const { data, isLoading, isError } = fetchOrders()

  const arrayFormData = Object.entries(data ?? {}).map(([id, data]) => ({
    id,
    ...(typeof data === 'object' && data !== null ? data : {}),
  })) as Order[]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: arrayFormData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h1 className="font-semibold text-[20px]">Customer Lists</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
