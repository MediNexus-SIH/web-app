import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const vendorOrders = await prisma.vendorOrder.findMany();
      res.status(200).json(vendorOrders);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch vendor orders' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
