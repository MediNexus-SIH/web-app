import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const records = await prisma.unifiedInventorySupplyDemand.findMany();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch records' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
