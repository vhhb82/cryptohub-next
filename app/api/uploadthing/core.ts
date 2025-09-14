import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Middleware pentru autentificare (opțional)
const auth = async () => {
  // Pentru moment, nu verificăm autentificarea
  return { userId: "admin" };
};

export const ourFileRouter = {
  // Upload pentru imagini de știri/postări
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

