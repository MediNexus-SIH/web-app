import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, vendor_id, item_id, quantity, order_date, delivery_date, status } = req.body;
    try {
      const updatedVendorOrder = await prisma.vendorOrder.update({
        where: { id },
        data: {
          vendor_id,
          item_id,
          quantity,
          order_date,
          delivery_date,
          status,
        },
      });
      res.status(200).json(updatedVendorOrder);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update vendor order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
