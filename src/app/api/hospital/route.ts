import prisma from "@/config/prisma.config"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Fetch all hospitals with selected fields
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        hospitalName: true,
        state: true,
        admin_email: true,
        admin_name: true,
        departments: true,
      }
    }).then(hospitals => hospitals.map(hospital => ({
      ...hospital,
      // Fill in empty fields with arbitrary data
      id: hospital.id || `H${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      hospitalName: hospital.hospitalName || `Medical Center ${Math.floor(Math.random() * 100)}`,
      state: hospital.state || generateRandomState(),
      admin_email: hospital.admin_email || `admin${Math.floor(Math.random() * 1000)}@hospital.com`,
      admin_name: hospital.admin_name || generateRandomName(),
      departments: hospital.departments?.length ? hospital.departments : generateDefaultDepartments(),
      // Add some extra arbitrary fields
      contactPhone: `+1 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
      lastOrderDate: generateRandomRecentDate()
    })));

    return NextResponse.json({
      success: true,
      data: hospitals,
      total: hospitals.length
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch hospitals",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// Helper functions to generate arbitrary data
function generateRandomState() {
  const states = [
    'CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI',
    'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'
  ];
  return states[Math.floor(Math.random() * states.length)];
}

function generateRandomName() {
  const firstNames = ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function generateDefaultDepartments() {
  const possibleDepartments = [
    'Emergency', 
    'Cardiology', 
    'Neurology', 
    'Pediatrics', 
    'Oncology', 
    'Orthopedics', 
    'Radiology', 
    'Surgery'
  ];
  
  // Generate 2-4 random unique departments
  const numDepartments = Math.floor(Math.random() * 3) + 2;
  const departments = new Set();
  
  while (departments.size < numDepartments) {
    departments.add(possibleDepartments[Math.floor(Math.random() * possibleDepartments.length)]);
  }
  
  return Array.from(departments);
}

function generateRandomRecentDate() {
  // Generate a date within the last year
  const now = new Date();
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  const randomDate = new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
  
  return randomDate.toISOString().split('T')[0]; // YYYY-MM-DD format
}