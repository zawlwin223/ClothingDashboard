import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  totalQuantity: z.string().min(1, 'TotalQuantity is required'),
  size: z.string().min(1, 'Size is required'),
  category: z.string().min(1, 'Category is required'),
  image: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Image file is required')
        .refine(
          (file) => ['image/jpeg', 'image/png'].includes(file.type),
          'Only Jpeg and Png files are allowed'
        ),
      z.string().min(1, 'Image is required'),
    ])
    .refine(
      (value) => value !== undefined && value !== null,
      'Image is required'
    ),
})

export type ProductInput = z.infer<typeof productSchema>
