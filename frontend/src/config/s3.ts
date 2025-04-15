import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// AWS S3 Configuration
const REGION = import.meta.env.VITE_AWS_REGION;
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;
const ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

// Initialize S3 Client for the browser
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation: "WHEN_REQUIRED"
});

// Function to upload a file to S3
export const uploadFileToS3 = async (file: File) => {
  try {
    // Create a unique key for the file in the S3 bucket
    const fileKey = `uploads/${Date.now()}_${file.name}`;

    // Create PutObjectCommand to upload the file
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file, // Directly using the File object (which is a Blob)
      ContentType: file.type,
    });

    // Upload the file to S3
    const response = await s3Client.send(command);

    console.log('File uploaded successfully:', response);
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileKey}`; // Return public URL for the uploaded file
  } catch (err) {
    console.error('Error uploading file:', err);
    throw new Error('File upload failed');
  }
};