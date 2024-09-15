import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      await prisma.departments.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete department' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
