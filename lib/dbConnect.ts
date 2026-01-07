import mongoose from 'mongoose'

declare global {
  var _mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local')
}

// Add this line to assure TypeScript it's a string
const connectionString = MONGODB_URI as string

let cached = global._mongoose

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // Use connectionString instead of MONGODB_URI
    cached.promise = mongoose.connect(connectionString).then(mongoose => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect