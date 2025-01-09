import clientPromise from '@/lib/mongodb'

import Image from 'next/image'
import { ObjectId } from 'mongodb'
import ProductUploadForm from '@/components/ProductUploadForm';

interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  image: {
    data: string;
    contentType: string;
  };
  createdAt: Date;
}

async function getProducts(): Promise<Product[]> {
  const client = await clientPromise
  const db = client.db('productDatabase')
  const products = await db.collection<Product>('products').find({}).sort({ createdAt: -1 }).toArray()
  return products
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id.toString()} className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="relative h-64">
                <Image
                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

