import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hospital_id, blood_group, quantity, last_updated } = req.body;
    try {
      const bloodBank = await prisma.bloodBank.create({
        data: {
          hospital_id,
          blood_group,
          quantity,
          last_updated,
        },
      });
      res.status(200).json(bloodBank);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create blood bank record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
