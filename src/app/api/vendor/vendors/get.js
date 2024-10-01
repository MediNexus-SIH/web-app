import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const vendors = await prisma.vendor.findMany();
      res.status(200).json(vendors);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch vendors' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
