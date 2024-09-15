import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const logs = await prisma.stockReplenishmentLog.findMany();
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch logs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
