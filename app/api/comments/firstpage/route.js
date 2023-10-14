import connectMongoDB from "@/libs/mongodb"
import Comment from "@/models/comment"
import { NextResponse } from "next/server"

export async function GET( ) {
    await connectMongoDB()
    const comments = await Comment.find().sort({ createdAt: -1}).limit(4)
    return NextResponse.json({comments})
}