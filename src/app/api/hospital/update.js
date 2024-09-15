import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, contact_number, address_line_1, address_line_2, pincode, city, username, region } = req.body;
    try {
      const updatedHospital = await prisma.hospital.update({
        where: { id },
        data: {
          name,
          contact_number,
          address_line_1,
          address_line_2,
          pincode,
          city,
          username,
          region,
        },
      });
      res.status(200).json(updatedHospital);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update hospital' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
