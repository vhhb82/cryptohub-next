// Server-side Cloudinary configuration
let cloudinary: any = null;

if (typeof window === 'undefined') {
  // Only import and configure on server-side
  const { v2 } = require('cloudinary');
  cloudinary = v2;
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export { cloudinary };

// Client-side configuration
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
};

// Helper function to get Cloudinary URL with transformations
export function getCloudinaryUrl(publicId: string, transformations?: string) {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  return transformations 
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;
}

// Helper function to extract public_id from Cloudinary URL
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}
