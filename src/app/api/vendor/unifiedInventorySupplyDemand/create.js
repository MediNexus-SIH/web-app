import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { item_id, hospital_id, quantity, demand_or_supply, date } = req.body;
    try {
      const record = await prisma.unifiedInventorySupplyDemand.create({
        data: {
          item_id,
          hospital_id,
          quantity,
          demand_or_supply,
          date,
        },
      });
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
