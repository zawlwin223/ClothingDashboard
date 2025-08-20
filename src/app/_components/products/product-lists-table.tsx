'use client'
import Image from 'next/image'
import { Product } from '@/app/_type/productType'
import { useDeleteProduct } from '@/app/_hook/productsMutation'
import { useFetchProducts } from '@/app/_hook/fetchProducts'
import { useState, useEffect } from 'react'
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

import { CirclePlus, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import Modal from '../modal'

type ProductListsTableProps = {
  setProductFormModal: (value: boolean) => void
  setEditProductFormModal: (product: Product) => void
}
export default function ProductListsTable({
  setProductFormModal,
  setEditProductFormModal,
}: ProductListsTableProps) {
  const [confirmModal, setConfirmModal] = useState<any>(false)
  const deleteProduct = useDeleteProduct(() => {
    setConfirmModal(false)
  })
  const { isPending } = deleteProduct

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const imgUrl = row.getValue('image')
        return (
          <Image
            src={
              typeof imgUrl === 'object' && imgUrl !== null
                ? String((imgUrl as { url: unknown }).url)
                : String(imgUrl)
            }
            alt={String(row.getValue('title'))}
            width={30}
            height={30}
            className="object-contain"
          />
        )
      },
    },
    {
      accessorKey: 'title',
      header: 'Name',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      filterFn: (row, columnId, filterValue) => {
        const price = row.getValue('price')
        return String(price).includes(String(filterValue))
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('price')}</div>
      ),
    },
    {
      accessorKey: 'totalQuantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('totalQuantity')}</div>
      ),
    },

    {
      accessorKey: 'size',
      header: 'Size',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('size')}</div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('category')}</div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

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
              <DropdownMenuItem
                onClick={() => setEditProductFormModal(product)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-700"
                onClick={() =>
                  setConfirmModal({
                    productId: product.id,
                    imageId:
                      typeof product.image === 'object' &&
                      product.image !== null &&
                      'public_id' in product.image
                        ? product.image.public_id
                        : '',
                  })
                }>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const { data: products = [], isLoading, error } = useFetchProducts()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: products as Product[],
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

  useEffect(() => {
    table.setPageSize(5)
  }, [table])

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-end py-4 flex-wrap">
          <Input
            placeholder="Filter By Name..."
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white mt-1 flex-1 min-w-[100px]"
          />
          <Input
            placeholder="Filter By Price..."
            value={(table.getColumn('price')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('price')?.setFilterValue(event.target.value)
            }
            className="max-w-sm ms-0 mt-1 lg:ms-3 bg-white flex-1 min-w-[100px]"
          />
          <Input
            placeholder="Filter By Category..."
            value={
              (table.getColumn('category')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('category')?.setFilterValue(event.target.value)
            }
            className="max-w-sm mx-0 mt-1  lg:mx-3 bg-white flex-1 min-w-[100px]"
          />
          <Button
            onClick={() => setProductFormModal(true)}
            className="flex-1 mt-1 min-w-[100px]">
            <CirclePlus></CirclePlus> Add New Product
          </Button>
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
                deleteProduct.mutate(confirmModal)
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
