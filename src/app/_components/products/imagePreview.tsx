'use client'

import { useState, useEffect, useRef } from 'react'

interface ImagePreviewProps {
  initialImg?: string
}

export default function ImagePreview({ initialImg = '' }: ImagePreviewProps) {
  const [imagePreview, setImagePreview] = useState<string>('')
  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setImagePreview(initialImg)
  }, [initialImg])

  function handleChooseFile() {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="mb-4">
      <input
        ref={inputFileRef}
        type="file"
        name="image"
        onChange={handleImageChange}
        className="hidden"
      />

      <input type="hidden" name="currentImg" value={imagePreview} />

      <button type="button" onClick={handleChooseFile}>
        Choose Photo
      </button>

      {imagePreview && (
        <div className="mt-4">
          <p className="mb-1 text-sm text-gray-500">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="h-20 w-auto object-contain border rounded"
          />
        </div>
      )}
    </div>
  )
}
