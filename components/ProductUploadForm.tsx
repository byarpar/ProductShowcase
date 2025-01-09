'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

export default function ProductUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file || !name || !description || !price) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append('image', file)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        setFile(null)
        setName('')
        setDescription('')
        setPrice('')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="backdrop-blur-lg bg-white bg-opacity-30 rounded-3xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 px-6 py-8 md:px-8 md:py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full pl-7 pr-12 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isUploading ? 'Uploading...' : 'Add Product'}
              </button>
            </form>
          </div>
          <div className="md:flex-1 px-6 py-8 md:px-8 md:py-12 bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">Product Image</h3>
              <div 
                {...getRootProps()} 
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out ${
                  isDragActive ? 'border-white bg-indigo-400' : 'border-gray-300 bg-white bg-opacity-10'
                }`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="relative">
                    <Image 
                      src={URL.createObjectURL(file)} 
                      alt="Product preview" 
                      width={192}
                      height={192}
                      className="max-h-48 rounded-lg object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setFile(null)
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-white" />
                    <p className="mt-2 text-sm text-white">
                      Drag & drop an image here, or click to select
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

