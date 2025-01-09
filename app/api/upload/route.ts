import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// Remove the deprecated config export
// export const config = {
//   api: {
//     bodyParser: false,
//   },
//   maxDuration: 30,
// }

// New configuration method
export const runtime = 'nodejs' // 'edge' or 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Validate request
    if (!req.body) {
      return NextResponse.json({ error: 'No form data provided' }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get('image') as File | null
    const name = formData.get('name') as string | null
    const description = formData.get('description') as string | null
    const priceString = formData.get('price') as string | null

    // Validate required fields
    if (!file || !name || !description || !priceString) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file size (e.g., 5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' },
        { status: 400 }
      )
    }

    const price = parseFloat(priceString)
    if (isNaN(price) || price < 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    // Process file
    const buffer = await file.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString('base64')

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('productDatabase')
    const collection = db.collection('products')

    // Create product document
    const product = {
      name,
      description,
      price,
      image: {
        data: base64Image,
        contentType: file.type,
      },
      createdAt: new Date(),
    }

    // Insert into database
    const result = await collection.insertOne(product)

    // Return success response
    return NextResponse.json({
      message: 'Product uploaded successfully',
      productId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

