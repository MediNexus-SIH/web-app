import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { vendor_id, item_id, quantity, order_date, delivery_date, status } = req.body;
    try {
      const vendorOrder = await prisma.vendorOrder.create({
        data: {
          vendor_id,
          item_id,
          quantity,
          order_date,
          delivery_date,
          status,
        },
      });
      res.status(200).json(vendorOrder);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create vendor order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
