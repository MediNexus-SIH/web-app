import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hospital_id, name, contact_number, password, department } = req.body;

    try {
      const departmentRecord = await prisma.departments.create({
        data: {
          hospital_id,
          name,
          contact_number,
          password,
          department,
        },
      });
      res.status(200).json(departmentRecord);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create department' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
