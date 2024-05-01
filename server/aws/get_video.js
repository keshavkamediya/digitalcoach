const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWSaccessKeyId,
    secretAccessKey: process.env.AWSsecretAccessKey,
  },
});

const GetObjectURL = async (key) => {
  console.log(key);
  const command = new GetObjectCommand({
    Bucket: "ankitpawar-course-bucket",
    Key: key,
  });
  const URL = await getSignedUrl(Client, command, { expiresIn: 5400 });
  return URL;
};

module.exports = GetObjectURL;
