'use client'

import { useState } from 'react'

export default function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        alert('Image uploaded successfully')
        setFile(null)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Upload failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      <button
        type="submit"
        disabled={!file}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Upload Image
      </button>
    </form>
  )
}

