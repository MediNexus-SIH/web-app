import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, contact_info, address } = req.body;
    try {
      const vendor = await prisma.vendor.create({
        data: {
          name,
          contact_info,
          address,
        },
      });
      res.status(200).json(vendor);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create vendor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
