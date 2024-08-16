// pages/api/messages.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    if (method === 'POST') {
      const { to, pesan, musik } = req.body;

      if (!to) {
        return res.status(400).json({ error: 'Field "to" is required' });
      }

      const result = await db.collection('pesan').insertOne({
        to,
        pesan: pesan || null,
        musik: musik || null,
      });

      return res.status(201).json({ message: 'Data inserted successfully', id: result.insertedId });
    } else if (method === 'GET') {
      const limit = 20; // Pagination limit

      const messages = await db.collection('pesan').find({}).limit(limit).toArray();
      return res.status(200).json(messages);
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
