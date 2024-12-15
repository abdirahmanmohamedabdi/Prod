import { createUploadthing, makeFileHandler } from '@uploadthing/react';
import { withApiAuthRequired } from '@auth0/nextjs-auth0'; // Optional, if you want to protect the endpoint

const uploadthing = createUploadthing();

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to handle raw file data
  },
};

export default withApiAuthRequired(async (req, res) => {
  const handler = makeFileHandler();

  if (req.method === "POST") {
    const { files, error } = await handler(req);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // You can save the file to Supabase or any other storage you use
    // For example, upload to Supabase bucket:
    const { data, error: uploadError } = await supabase.storage
      .from("employee-documents")
      .upload(`employee_files/${files[0].name}`, files[0], {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    return res.status(200).json({ fileUrl: data?.Key });
  }

  return res.status(405).json({ message: "Method not allowed" });
});
