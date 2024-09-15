import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, inventory_item_id, log_date, old_quantity, new_quantity } = req.body;
    try {
      const updatedLog = await prisma.stockReplenishmentLog.update({
        where: { id },
        data: {
          inventory_item_id,
          log_date,
          old_quantity,
          new_quantity,
        },
      });
      res.status(200).json(updatedLog);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update log' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
