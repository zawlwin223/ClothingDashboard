'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { MoreHorizontal } from 'lucide-react'
import { useFetchOrders } from '@/app/_hook/fetchOrders'
import { useDeleteOrder } from '@/app/_hook/ordersMutation'
import { useOrderStatusUpdate } from '@/app/_hook/ordersMutation'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import CustomerOrderModal from '@/app/_components/orders/customerOrderModal'
import Modal from '../modal'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '../datePicker'

import {
  DropdownMenu,
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

import { Order } from '@/app/_type/orderType'

export function CustomerListTable() {
  const [customerOrderModal, setCustomerOrderModal] = useState<Order | false>(
    false
  )
  const [confirmModal, setConfirmModal] = useState<any>(false)

  const orderDeleteMutation = useDeleteOrder(() => {
    setConfirmModal(false)
  })
  const orderStatusMutation = useOrderStatusUpdate()
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'date',
      id: 'date',
      header: 'Date',
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true
        const date = row.getValue('date')
        console.log('Order Date', date)
        console.log('filter value', filterValue)
        return date === filterValue
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('date')}</div>
      ),
    },
    {
      accessorKey: 'customer.fullName',
      id: 'name',
      header: 'Name',
      // accessorFn: (row) => row.customer.fullName,
      cell: ({ row }) => (
        <div className="lowercase">{row.original.customer.fullName}</div>
      ),
    },
    {
      accessorKey: 'customer.email',
      id: 'email',
      // accessorFn: (row) => row.customer.email,

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
      accessorKey: 'status',
      header: 'Status',
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true
        const status = row.original.status as string | null
        const normalized = status ? status.toLowerCase() : 'pending'
        return normalized === filterValue
      },
      cell: ({ row }) => (
        <div className="lowercase">
          <Badge
            variant="default"
            className={` text-white ${!row.original.status ? 'bg-yellow-500' : row.original.status === 'Shipped' ? 'bg-green-500' : 'bg-blue-500'}`}>
            {row.original.status
              ? row.original.status === 'Confirmed'
                ? 'Confirmed'
                : 'Shipped'
              : 'Pending'}
          </Badge>
        </div>
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
                  setCustomerOrderModal(row.original)
                }}>
                View Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.status
                    ? row.original.status !== 'Confirmed'
                      ? true
                      : false
                    : true
                }
                onClick={() => {
                  orderStatusMutation.mutate({
                    id: row.original.id,
                    status: 'Shipped',
                  })
                }}>
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setConfirmModal(row.original.id)
                  // orderDeleteMutation.mutate(row.original.id)
                }}>
                <span className="text-red-700">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const { data } = useFetchOrders()
  const { isPending } = orderDeleteMutation

  const arrayFormData = Object.entries(data ?? {}).map(([id, data]) => ({
    id,
    ...(typeof data === 'object' && data !== null ? data : {}),
  })) as Order[]

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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

  useEffect(() => {
    table.setPageSize(5)
  }, [table])

  return (
    <>
      <div className="w-full p-4 rounded-lg ">
        <div className="flex items-center pb-4 flex-wrap">
          <Input
            placeholder="Filter By Emails..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white flex-1  mt-1"
          />
          <Input
            placeholder="Filter By Name..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white ms-0 lg:ms-3  flex-1  mt-1"
          />
          <Select
            onValueChange={(value) =>
              table.getColumn('status')?.setFilterValue(value || undefined)
            }>
            <SelectTrigger className="w-[180px] bg-white ms-0 lg:ms-3  flex-1  mt-1">
              <SelectValue placeholder="Filter By Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'all'}>All</SelectItem>
              <SelectItem value={'pending'}>pending</SelectItem>
              <SelectItem value="confirmed">confirmed</SelectItem>
              <SelectItem value="shipped">shipped</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker
            onChange={(date: Date | undefined) => {
              const isoString = date && date.toISOString()
              const filterDate = isoString?.substring(0, isoString.indexOf('T'))
              table.getColumn('date')?.setFilterValue(filterDate || undefined)
            }}></DatePicker>
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
          <CustomerOrderModal
            setOrderConfirmed={(id) =>
              orderStatusMutation.mutate({ id, status: 'Confirmed' })
            }
            onClose={() => setCustomerOrderModal(false)}
            order={customerOrderModal}
          />
        </Modal>
      )}
      {confirmModal && (
        <Modal onClose={() => setConfirmModal(false)}>
          <h3 className="text-xl font-semibold">
            Are you sure you want to delete?
          </h3>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                orderDeleteMutation.mutate(confirmModal)
              }}
              className="bg-black text-white">
              {isPending ? 'Loading...' : 'Confirm'}
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
