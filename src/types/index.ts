import type { User } from "@/features/users/types";

// Auth Context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Theme Context types
export interface ThemeContextType {
  theme: any;
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

// Registration data
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

// Common component props
export interface ChildrenProps {
  children: React.ReactNode;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form values
export interface LoginFormValues {
  email: string;
  password: string;
}

// Upload types
export interface UploadFile {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url?: string;
  cloudinaryId?: string;
}

// Cloudinary types
export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

// Image component types
export interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export interface ImageUploadProps {
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  maxCount?: number;
}

export { User };
