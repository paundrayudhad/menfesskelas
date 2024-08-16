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

      try {
        const result = await db.collection('pesan').insertOne({
          to,
          pesan: pesan || null, // Use null if 'pesan' is not provided
          musik: musik || null  // Use null if 'musik' is not provided
        });

        return res.status(201).json({ message: 'Data inserted successfully', id: result.insertedId });
      } catch (insertError) {
        console.error('Error inserting data:', insertError.message);
        return res.status(500).json({ error: 'Failed to insert data' });
      }
    } else if (method === 'GET') {
      // Retrieve all data from 'pesan' collection with a limit to improve performance
      const limit = 20; // Adjust the limit based on your needs

      try {
        const messages = await db.collection('pesan').find({}).limit(limit).toArray();
        return res.status(200).json(messages);
      } catch (fetchError) {
        console.error('Error retrieving data:', fetchError.message);
        return res.status(500).json({ error: 'Failed to retrieve data' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
