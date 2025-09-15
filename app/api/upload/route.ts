import { NextResponse } from 'next/server';

export async function POST() {
  // Redirect to Cloudinary direct upload
  return NextResponse.json(
    { 
      error: 'Endpoint deprecated',
      message: 'Please use Cloudinary direct upload. This endpoint has been removed.',
      redirect: 'Use ImageUploader component instead'
    },
    { status: 410 } // Gone - resource no longer available
  );
}

export async function GET() {
  return NextResponse.json(
    { 
      error: 'Endpoint deprecated',
      message: 'Please use Cloudinary direct upload. This endpoint has been removed.',
      redirect: 'Use ImageUploader component instead'
    },
    { status: 410 } // Gone - resource no longer available
  );
}
