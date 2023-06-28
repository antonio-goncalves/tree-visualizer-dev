import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest, context: { params }):Promise<NextResponse> {

    const data = {m:1234,date:new Date()}

    console.log(request.url,context)
    return NextResponse.json({ data })
}