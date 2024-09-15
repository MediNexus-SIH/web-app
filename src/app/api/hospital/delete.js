import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.hospital.delete({ where: { id } });
      res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete hospital' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
