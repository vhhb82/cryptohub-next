import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    if (!cloudinary) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
    }

    const { action, publicId, transformations } = await request.json();

    switch (action) {
      case 'delete':
        if (!publicId) {
          return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
        }
        
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        return NextResponse.json({ success: true, result: deleteResult });

      case 'transform':
        if (!publicId || !transformations) {
          return NextResponse.json({ error: 'Public ID and transformations are required' }, { status: 400 });
        }
        
        const transformedUrl = cloudinary.url(publicId, transformations);
        return NextResponse.json({ url: transformedUrl });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cloudinary API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
