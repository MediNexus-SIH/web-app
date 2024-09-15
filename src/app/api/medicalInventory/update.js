import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, hospital_id, department_id, item_name, manufacturer, expiry_date, quantity, price, unit } = req.body;

    try {
      const updatedInventoryItem = await prisma.medicalInventory.update({
        where: { id: parseInt(id) },
        data: {
          hospital_id,
          department_id,
          item_name,
          manufacturer,
          expiry_date: new Date(expiry_date),
          quantity,
          price,
          unit,
        },
      });
      res.status(200).json(updatedInventoryItem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update inventory item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
