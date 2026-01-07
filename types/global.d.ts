// types/global.d.ts
import mongoose from 'mongoose'

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

// This exports nothing, but makes TypeScript treat this as a module
export {}