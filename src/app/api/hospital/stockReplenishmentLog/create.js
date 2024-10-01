import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { inventory_item_id, log_date, old_quantity, new_quantity } = req.body;
    try {
      const log = await prisma.stockReplenishmentLog.create({
        data: {
          inventory_item_id,
          log_date,
          old_quantity,
          new_quantity,
        },
      });
      res.status(200).json(log);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create stock replenishment log' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
