// Simplified User types
export interface User {
  id?: string;
  _id?: string; // MongoDB format
  email: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneNumber?: string; // Alternative field name
  phonenumber?: string; // Backend format
  countryAreaCode?: string;
  countryareacode?: string; // Backend format
  dateOfBirth?: string;
  birthday?: string; // Alternative field name
  gender?: string;
  address?: string;
  role: string;
  isActive?: boolean;
  isactive?: boolean; // Backend format
  vendor?: boolean;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;

  // Additional backend fields
  userid?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  addeddatetime?: string;
  loggeddatetime?: string;
  lastmodifieddatetime?: string;

  // Backend format privilege fields
  manageusers?: boolean;
  manageprivileges?: boolean;
  findguide?: boolean;
  aboutsrilanka?: boolean;
  toprecommendplaces?: boolean;

  // Permissions - simplified
  dashboard?: boolean;
  master?: boolean;
  manageUsers?: boolean;
  managePrivileges?: boolean;
  destination?: boolean;
  activity?: boolean;
  accommodation?: boolean;
  services?: boolean;
  transport?: boolean;
  findGuide?: boolean;
  food?: boolean;
  event?: boolean;
  news?: boolean;
  advertisement?: boolean;
  aboutSriLanka?: boolean;
  gallery?: boolean;
  topRecommendPlaces?: boolean;
}

export interface Role {
  id: string;
  name: string;
  status?: string;
  // Permission flags
  destination?: boolean;
  activity?: boolean;
  accommodation?: boolean;
  services?: boolean;
  transport?: boolean;
  findGuide?: boolean;
  food?: boolean;
  event?: boolean;
}

// API Response types
export interface UserResponse {
  users?: User[];
  data?: User[];
  user?: User;
  total?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

// Re-export all props types
export * from "./props";
