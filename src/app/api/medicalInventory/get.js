import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const inventoryItem = id
        ? await prisma.medicalInventory.findUnique({ where: { id: parseInt(id) } })
        : await prisma.medicalInventory.findMany();

      res.status(200).json(inventoryItem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch inventory item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
