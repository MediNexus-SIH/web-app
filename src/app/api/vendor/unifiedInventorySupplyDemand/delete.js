import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.unifiedInventorySupplyDemand.delete({ where: { id } });
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
