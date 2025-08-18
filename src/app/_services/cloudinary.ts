'use server'
import cloudinary from '../_libs/cloudinary'

export async function saveImageFile(file: File) {
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
        .end(fileBuffer)
    })
    return result
  } catch (error) {
    return { error: 'Upload failed', status: 500 }
  }
}

export async function deleteImage(imageId: string): Promise<void> {
  try {
    const res = await cloudinary.uploader.destroy(imageId)
    if (res.result !== 'ok') {
      throw new Error(`Failed to delete image with ID ${imageId}`)
    }
  } catch (error) {
    throw new Error(
      `Failed to delete image with ID ${imageId}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

export async function updateImage({
  file,
  imageId,
}: {
  file: File
  imageId: string
}) {
  await deleteImage(imageId)
  const result = await saveImageFile(file)
  return result
}
