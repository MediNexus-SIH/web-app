import { useEffect, useState } from "react";

interface Department {
  id: string;
  hospital_id: string;
  hod_name: string;
  hod_email: string;
  department: string;
}

interface TransformedDepartment {
  value: string;
  label: string;
}

const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/hospital/departments/`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data: Department[] = await response.json();
        setDepartments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Map departments to their names
  const departmentNames = departments.map(
    (department) => department.department
  );

  // Transform departments for dropdown
  const dropdownDepartments: TransformedDepartment[] = departments.map(
    (department) => ({
      value: department.department.toLowerCase(),
      label:
        department.department.charAt(0).toUpperCase() +
        department.department.slice(1),
    })
  );

  return { departments, departmentNames, dropdownDepartments, loading, error };
};

export default useDepartments;
