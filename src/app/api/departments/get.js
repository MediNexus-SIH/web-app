import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const department = id
        ? await prisma.departments.findUnique({ where: { id: parseInt(id) } })
        : await prisma.departments.findMany();

      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch department data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
