import type { Doctor } from '../types/doctor';

export const getDoctorsList = async (): Promise<Doctor[]> => {
  const response = await fetch('http://localhost:4000');
  return response.json();
};

export const getDoctorBySlug = async (slug: string): Promise<Doctor> => {
  const response = await fetch(`http://localhost:4000/${slug}`);
  return response.json();
};
