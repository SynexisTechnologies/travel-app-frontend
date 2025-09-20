// Component props types for users feature
import { User } from "./index";
import { FormInstance } from "antd";

// Form component props - Updated to match the restored UserForm
export interface UserFormProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  userData?: User | null;
  onAdd: (data: any) => Promise<void>;
  onEdit: (id: string, data: any) => Promise<void>;
}

// UserDetailsStep component props
export interface UserDetailsStepProps {
  handleRoleChange: (role: string) => void;
  form: FormInstance;
  handlePhoneChange: (phone: string) => void;
  fullPhoneNumber: string;
}

// PrivilegesStep component props
export interface PrivilegesStepProps {
  isAdminRole: boolean;
  privileges: {
    dashboard: boolean;
    master: boolean;
    manageUsers: boolean;
    managePrivileges: boolean;
    destination: boolean;
    activity: boolean;
    accommodation: boolean;
    services: boolean;
    transport: boolean;
    findGuide: boolean;
    food: boolean;
    event: boolean;
    news: boolean;
    advertisement: boolean;
    aboutSriLanka: boolean;
    gallery: boolean;
    topRecommendPlaces: boolean;
  };
  setPrivileges: React.Dispatch<
    React.SetStateAction<{
      dashboard: boolean;
      master: boolean;
      manageUsers: boolean;
      managePrivileges: boolean;
      destination: boolean;
      activity: boolean;
      accommodation: boolean;
      services: boolean;
      transport: boolean;
      findGuide: boolean;
      food: boolean;
      event: boolean;
      news: boolean;
      advertisement: boolean;
      aboutSriLanka: boolean;
      gallery: boolean;
      topRecommendPlaces: boolean;
    }>
  >;
  role: string;
  getDefaultPrivileges: (role: string) => any;
  handlePrivilegeChange: (privilege: string, checked: boolean) => void;
}

// View component props (only one still being used)
export interface UserViewProps {
  open: boolean;
  onClose: () => void;
  userData: User | null;
  onEdit: (userId: string) => void;
}
