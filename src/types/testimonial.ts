export interface Testimonial {
  id: string;
  name: string;
  subtitle: string | null;
  story: string;
  photo_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
