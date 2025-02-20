import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI; // Use environment variable for security
  if (!uri) {
    return res.status(500).json({ message: "MONGODB_URI is missing" });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db().command({ ping: 1 }); // Pinging the database

    res.status(200).json({ message: "MongoDB connected successfully!" });
    await client.close();
  } catch (error) {
    res.status(500).json({ message: "MongoDB connection failed", error: error.message });
  }
}
