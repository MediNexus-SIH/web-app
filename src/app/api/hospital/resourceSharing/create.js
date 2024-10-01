import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { source_hospital_id, target_hospital_id, resource_type, quantity, share_date } = req.body;
    try {
      const sharing = await prisma.resourceSharing.create({
        data: {
          source_hospital_id,
          target_hospital_id,
          resource_type,
          quantity,
          share_date,
        },
      });
      res.status(200).json(sharing);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create resource sharing record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
