import prisma from "@/config/prisma.config";

export default async function checkExistingHospital(
  hospitalName: string,
  addressLine1 :string,
  contact_number: string
) {
  const existingHospital = await prisma.hospital.findFirst({
    where: {
      OR: [{ 
        hospitalName: hospitalName, 
        address_line_1 : addressLine1,
      }, { contact_number: contact_number }],
    },
  });

  return existingHospital;
}
