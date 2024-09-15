import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, item_id, hospital_id, quantity, demand_or_supply, date } = req.body;
    try {
      const updatedRecord = await prisma.unifiedInventorySupplyDemand.update({
        where: { id },
        data: {
          item_id,
          hospital_id,
          quantity,
          demand_or_supply,
          date,
        },
      });
      res.status(200).json(updatedRecord);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
