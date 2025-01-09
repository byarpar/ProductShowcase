import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  // In development, warn about missing env variable
  if (process.env.NODE_ENV === 'development') {
    console.warn('Missing environment variable: "MONGODB_URI"')
  }
  // In production, provide a more graceful fallback or error handling
  throw new Error(
    'Please define the MONGODB_URI environment variable. Check your .env.local file or Vercel project settings.'
  )
}

const uri = process.env.MONGODB_URI
const options = {}

interface GlobalWithMongo extends Global {
  _mongoClientPromise?: Promise<MongoClient>
}

declare const global: GlobalWithMongo

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri!, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  const client = new MongoClient(uri!, options)
  clientPromise = client.connect()
}

export default clientPromise

