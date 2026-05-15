import axios from 'axios';

const BASE_URL = 'https://hcjoktrbrqosdghiwkyd.supabase.co/functions/v1';
const API_KEY = 'sb_publishable_mzdEn2_fXJ44xlDnggulBw_32yySI9m';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    apiKey: API_KEY,
  },
});

export const sendMagicLink = async (phone: string) => {
  try {
    const response = await apiClient.post('/auth-magic-link-v2', { phone });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Hubo un problema al conectar. Intente nuevamente.';
    throw new Error(errorMessage);
  }
};

export interface ValidateAccessResponse {
  access: boolean;
  initialData?: {
    id: string;
    student_name: string;
    student_grade: string;
    parent_name: string;
  };
  message?: string;
}

export const validateToken = async (token: string): Promise<ValidateAccessResponse> => {
  try {
    const response = await apiClient.post(`/validate-access/${token}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Token no válido o expirado.';
    throw new Error(errorMessage);
  }
};
