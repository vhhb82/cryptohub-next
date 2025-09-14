import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const f = createUploadthing();

// Middleware pentru autentificare (opțional)
const auth = async () => {
  // Pentru moment, nu verificăm autentificarea
  // Poți adăuga verificarea aici dacă vrei
  return { userId: "admin" };
};

export const ourFileRouter = {
  // Upload pentru imagini de știri
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Verifică autentificarea
      const session = await auth();
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Upload pentru imagini de produse
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Upload pentru imagini de postări
  postImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Post image upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
