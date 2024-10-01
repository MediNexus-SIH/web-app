import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, hospital_id, blood_group, quantity, last_updated } = req.body;

    try {
      const updatedBloodBank = await prisma.bloodBank.update({
        where: { id },
        data: {
          hospital_id,
          blood_group,
          quantity,
          last_updated,
        },
      });

      res.status(200).json(updatedBloodBank);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update blood bank record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
