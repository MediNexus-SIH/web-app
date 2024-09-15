import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, contact_number, address_line_1, address_line_2, pincode, city, username, security_question, security_question_answer, password, region } = req.body;
    
    try {
      const hospital = await prisma.hospital.create({
        data: {
          name,
          contact_number,
          address_line_1,
          address_line_2,
          pincode,
          city,
          username,
          security_question,
          security_question_answer,
          password,
          region,
        },
      });
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create hospital' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
