import type { InterviewTopic } from "@/types/interview-resource";

export interface InterviewQuestion {
  id: string;
  question: string;
  answer_1_label: string | null;
  answer_1: string;
  answer_2_label: string | null;
  answer_2: string | null;
  topic: InterviewTopic;
  source: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
