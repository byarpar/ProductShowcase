import clientPromise from '@/lib/mongodb'

import Image from 'next/image'
import { ObjectId } from 'mongodb'
import { Suspense } from 'react'
import ProductUploadForm from '@/components/ProductUploadForm'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Product {
  _id: ObjectId
  name: string
  description: string
  price: number
  imageUrl: string
  createdAt: Date
}

async function getProducts(): Promise<Product[]> {
  try {
    const client = await clientPromise
    const db = client.db('productDatabase')
    return await db
      .collection<Product>('products')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
          unoptimized // Add this to prevent caching issues
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 text-gray-800">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id.toString()} product={product} />
      ))}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg animate-pulse"
        >
          <div className="aspect-square bg-gray-200" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="flex justify-between items-center pt-4">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Product Showcase
          </span>
        </h1>
        <div className="mb-16">
          <ProductUploadForm />
        </div>
        <Suspense fallback={<LoadingGrid />}>
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </div>
  )
}

