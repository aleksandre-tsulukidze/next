import { MongoClient } from 'mongodb';
import { useRouter } from 'next/dist/client/router';

// /api/new-meetup

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const mongoDbCredentials = '';

    const client = await MongoClient.connect(mongoDbCredentials);

    const db = client.db();
    const meetupsCollections = db.collection('meetups');

    const result = await meetupsCollections.insertOne(data);
    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
};

export default handler;
