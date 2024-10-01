import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, source_hospital_id, target_hospital_id, resource_type, quantity, share_date } = req.body;
    try {
      const updatedSharing = await prisma.resourceSharing.update({
        where: { id },
        data: {
          source_hospital_id,
          target_hospital_id,
          resource_type,
          quantity,
          share_date,
        },
      });
      res.status(200).json(updatedSharing);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update sharing record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
