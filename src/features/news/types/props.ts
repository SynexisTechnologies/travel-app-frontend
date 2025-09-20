import { News } from "./index";

export interface NewsFormProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  newsData?: News | null;
  onAdd: (data: any) => Promise<void>;
  onEdit: (id: string | number, data: any) => Promise<void>;
}

export interface NewsViewProps {
  open: boolean;
  onClose: () => void;
  newsData: News;
  onEdit?: (newsId: string | number) => void;
}
