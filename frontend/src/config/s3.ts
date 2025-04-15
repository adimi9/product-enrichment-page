/** 
 * @file 
 * @description Uploads a file to AWS S3 using the AWS SDK in a browser environment.
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // Import necessary AWS SDK classes

// AWS S3 Configuration: Environment variables to configure S3 access
const REGION = import.meta.env.VITE_AWS_REGION; // AWS Region
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME; // S3 Bucket Name
const ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID; // AWS Access Key ID
const SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY; // AWS Secret Access Key

// Initialize the S3 client for the browser with the credentials and region
const s3Client = new S3Client({
  region: REGION, // AWS region where the bucket is located
  credentials: {
    accessKeyId: ACCESS_KEY_ID, // Access key ID from environment
    secretAccessKey: SECRET_ACCESS_KEY, // Secret access key from environment
  },
  requestChecksumCalculation: "WHEN_REQUIRED", // Enable checksum calculation when required
});

// Function to upload a file to S3
export const uploadFileToS3 = async (file: File) => {
  try {
    // Create a unique key for the file in the S3 bucket (based on current timestamp and file name)
    const fileKey = `uploads/${Date.now()}_${file.name}`;

    // Create a PutObjectCommand to upload the file to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME, // S3 Bucket name
      Key: fileKey, // Unique file key (path) in the S3 bucket
      Body: file, // The file (Blob) to upload
      ContentType: file.type, // The MIME type of the file (determined by the browser)
    });

    // Send the command to upload the file to S3 and wait for the response
    const response = await s3Client.send(command);

    // Log success message if file upload is successful
    console.log('File uploaded successfully:', response);

    // Return the public URL of the uploaded file in S3
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileKey}`;
  } catch (err) {
    // Catch and log any errors during the file upload process
    console.error('Error uploading file:', err);

    // Throw an error indicating the upload failed
    throw new Error('File upload failed');
  }
};
