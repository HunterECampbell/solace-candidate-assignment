export interface Advocate {
  id: number;
  city: string;
  createdAt: Date;
  degree: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  specialties: Specialty[];
  yearsOfExperience: number;
}

export type Specialty =
  | "Bipolar"
  | "LGBTQ"
  | "Medication/Prescribing"
  | "Suicide History/Attempts"
  | "General Mental Health (anxiety, depression, stress, grief, life transitions)"
  | "Men's issues"
  | "Relationship Issues (family, friends, couple, etc)"
  | "Trauma & PTSD"
  | "Personality disorders"
  | "Personal growth"
  | "Substance use/abuse"
  | "Pediatrics"
  | "Women's issues (post-partum, infertility, family planning)"
  | "Chronic pain"
  | "Weight loss & nutrition"
  | "Eating disorders"
  | "Diabetic Diet and nutrition"
  | "Coaching (leadership, career, academic and wellness)"
  | "Life coaching"
  | "Obsessive-compulsive disorders"
  | "Neuropsychological evaluations & testing (ADHD testing)"
  | "Attention and Hyperactivity (ADHD)"
  | "Sleep issues"
  | "Schizophrenia and psychotic disorders"
  | "Learning disorders"
  | "Domestic abuse";
