// pages/api/messages.js

import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    if (method === 'POST') {
      // Insert data into 'pesan' collection
      const { to, pesan, musik } = req.body;

      if (!to) {
        return res.status(400).json({ error: 'Field "to" is required' });
      }

      const result = await db.collection('pesan').insertOne({
        to,
        pesan: pesan || null, // Use null if 'pesan' is not provided
        musik: musik || null  // Use null if 'musik' is not provided
      });

      return res.status(201).json({ message: 'Data inserted successfully', id: result.insertedId });
    } else if (method === 'GET') {
      // Retrieve all data from 'pesan' collection
      const messages = await db.collection('pesan').find({}).toArray();
      return res.status(200).json(messages);
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error.message);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
