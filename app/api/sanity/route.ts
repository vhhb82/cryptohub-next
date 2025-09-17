import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const slug = searchParams.get('slug')

    if (!type) {
      return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 })
    }

    let data
    if (slug) {
      // Get single item by slug
      data = await client.fetch(`*[_type == "${type}" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0]`)
    } else {
      // Get all items of type
      data = await client.fetch(`*[_type == "${type}" && !(_id in path("drafts.**"))] | order(_createdAt desc)`)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Sanity API error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json({ error: 'Type and data are required' }, { status: 400 })
    }

    const result = await client.create({
      _type: type,
      ...data,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Sanity create error:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, data } = body

    if (!id || !data) {
      return NextResponse.json({ error: 'ID and data are required' }, { status: 400 })
    }

    const result = await client.patch(id).set(data).commit()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Sanity update error:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
    }

    await client.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sanity delete error:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}
