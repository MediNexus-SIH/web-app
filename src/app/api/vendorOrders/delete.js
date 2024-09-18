import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.vendorOrder.delete({ where: { id } });
      res.status(200).json({ message: 'Vendor order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete vendor order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}