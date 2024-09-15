import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, hospital_id, name, contact_number, department } = req.body;

    try {
      const updatedDepartment = await prisma.departments.update({
        where: { id: parseInt(id) },
        data: {
          hospital_id,
          name,
          contact_number,
          department,
        },
      });
      res.status(200).json(updatedDepartment);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update department' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
