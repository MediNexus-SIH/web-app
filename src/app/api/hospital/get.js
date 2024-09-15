import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const hospitals = await prisma.hospital.findMany();
      res.status(200).json(hospitals);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch hospitals' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
