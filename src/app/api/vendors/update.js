import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, contact_info, address } = req.body;
    try {
      const updatedVendor = await prisma.vendor.update({
        where: { id },
        data: {
          name,
          contact_info,
          address,
        },
      });
      res.status(200).json(updatedVendor);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update vendor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
