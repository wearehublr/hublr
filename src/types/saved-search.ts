export interface SavedSearch {
  id: string;
  user_id: string;
  label: string;
  region: string | null;
  category: string | null;
  visa_sponsorship: string | null;
  industry: string | null;
  keyword: string | null;
  created_at: string;
  last_notified_at: string | null;
}
