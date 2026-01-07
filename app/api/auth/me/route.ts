import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/User'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
      email: string
      role: string
    }

    // Find user
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      const response = NextResponse.json({ user: null })
      response.cookies.delete('token')
      return response
    }

    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    }

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Auth check error:', error)
    
    // Clear invalid token
    const response = NextResponse.json({ user: null })
    response.cookies.delete('token')
    return response
  }
}