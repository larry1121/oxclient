export interface Project {
  id: number;
  space_id: number;
  name: string;
  description: string;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
} 