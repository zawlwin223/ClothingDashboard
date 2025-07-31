'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDataFromFB } from '@/app/_utils/firebase'
import Image from 'next/image'
import { Product } from '@/app/type/productType'
// import { deleteProduct } from '@/app/_action/product'
import { useDeleteProduct } from '@/app/_hook/productsMutation'
import { useFetchProducts } from '@/app/_hook/fetchProducts'
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

import { Button } from '@/components/ui/button'

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

type ProductListsTableProps = {
  setProductFormModal: (value: boolean) => void
  setEditProductFormModal: (product: Product) => void
}
export default function ProductListsTable({
  setProductFormModal,
  setEditProductFormModal,
}: ProductListsTableProps) {
  const deleteProduct = useDeleteProduct()

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const imgUrl = row.getValue('image')
        console.log('Image URL:', imgUrl)
        return (
          <Image
            src={
              typeof imgUrl === 'object' && imgUrl !== null
                ? String((imgUrl as { url: unknown }).url)
                : String(imgUrl)
            }
            alt={String(row.getValue('title'))}
            width={50}
            height={50}
            className="object-contain"
          />
        )
      },
    },
    {
      accessorKey: 'title',
      header: 'Titile',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
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
                onClick={() =>
                  deleteProduct.mutate({
                    productId: product.id,
                    imageId:
                      typeof product.image === 'object' &&
                      product.image !== null
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

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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

  React.useEffect(() => {
    table.setPageSize(5)
  }, [table])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter By title..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => setProductFormModal(true)}>
          Add New Product
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
  )
}
