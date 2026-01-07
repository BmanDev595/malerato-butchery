import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/dbConnect'

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ 
      message: 'MongoDB connected successfully!',
      status: 'connected'
    })
  } catch (error) {
    return NextResponse.json({ 
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}