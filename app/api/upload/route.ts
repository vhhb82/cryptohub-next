import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { 
      error: 'Upload endpoint deprecated. Use Cloudinary directly.',
      message: 'This endpoint has been removed. Please refresh the page and try again.'
    },
    { status: 410 } // Gone - resource no longer available
  );
}

export async function GET() {
  return NextResponse.json(
    { 
      error: 'Upload endpoint deprecated. Use Cloudinary directly.',
      message: 'This endpoint has been removed. Please refresh the page and try again.'
    },
    { status: 410 } // Gone - resource no longer available
  );
}
