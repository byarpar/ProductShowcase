import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

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

    if (isNaN(price)) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString('base64')

    const client = await clientPromise
    const db = client.db('productDatabase')
    const collection = db.collection('products')

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

    const result = await collection.insertOne(product)

    return NextResponse.json({ 
      message: 'Product uploaded successfully',
      productId: result.insertedId.toString()
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

