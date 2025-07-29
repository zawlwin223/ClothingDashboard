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
import { useState } from 'react'
import CustomerOrderModal from '@/app/_components/orders/customerOrderModal'
import Modal from '../modal'

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

// export type Order = {
//   id: string
//   date: string
//   customer: Customer
//   items: any[]
//   totalPrice: string
// }

type OrderItem = {
  id: string
  title?: string
  price: number
  quantity: number
  size: string
  image: {
    url: string
    alt?: string
  }
}

interface Order {
  id: string
  date: string
  customer: Customer
  items: OrderItem[]
  totalPrice: string
}

export function DataTableDemo() {
  const [customerOrderModal, setCustomerOrderModal] = useState<
    OrderItem[] | false
  >(false)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('date')}</div>
      ),
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
      id: 'customer.email',
      accessorFn: (row) => row.customer.email,

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
              <DropdownMenuItem
                onClick={() => {
                  console.log('it works')
                  console.log('View customer orders:', row.original)
                  setCustomerOrderModal(row.original.items)
                }}>
                View Orders
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
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
    autoResetPageIndex: false,
  })

  return (
    <>
      <div className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        <h1 className="font-semibold text-[20px]">Customer Lists</h1>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={
              (table.getColumn('customer.email')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('customer.email')
                ?.setFilterValue(event.target.value)
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
      {customerOrderModal && (
        <Modal onClose={() => setCustomerOrderModal(false)}>
          <CustomerOrderModal items={customerOrderModal} />
        </Modal>
      )}
    </>
  )
}
