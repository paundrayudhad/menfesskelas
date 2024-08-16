import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    
    // Mengambil semua data dari koleksi 'pesan'
    const messages = await db.collection('pesan').find({}).toArray();

    res.status(200).json("messages");
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
