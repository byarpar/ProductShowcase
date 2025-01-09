import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null
    const name = formData.get('name') as string | null
    const description = formData.get('description') as string | null
    const priceString = formData.get('price') as string | null

    if (!file || !name || !description || !priceString) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const price = parseFloat(priceString)
    if (isNaN(price) || price < 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    // Upload image to Cloudinary
    const buffer = await file.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString('base64')
    const cloudinaryResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(`data:${file.type};base64,${base64Image}`, {
        folder: 'product-showcase'
      }, (error, result) => {
        if (error) reject(error)
        else if (result) resolve(result)
        else reject(new Error('Cloudinary upload failed without an error'))
      })
    })

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
        url: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id,
      },
      createdAt: new Date(),
    }

    // Insert into database
    const result = await collection.insertOne(product)

    return NextResponse.json({
      message: 'Product uploaded successfully',
      productId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

