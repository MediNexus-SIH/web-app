export interface Department {
  name: string;
  hodName: string;
  hodEmail: string;
}

export interface FormData {
  hospitalName: string;
  addressLine1: string;
  addressLine2: string;
  region: string;
  pincode: string;
  state: string;
  phoneNumber: string;
  departments: Department[];
  adminName: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
  securityQuestion:string;
  securityAnswer:string;
}