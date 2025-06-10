import CONFIG from '../config';

export const VAPID_PUBLIC_KEY =
  'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

// Endpoints untuk berbagai aksi
const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  PREDICT: `http://localhost:3000/api/predictions`,
};

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json(); // Panggil sekali saja!

    if (!response.ok) {
      // Tangani error dengan data dari server
      throw new Error(data.message || 'Terjadi kesalahan pada server kami');
    }

    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Penting: lempar lagi agar presenter bisa menangani
  }
}

export async function loginUser(email, password) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export async function predictCareer(formData) {
  try {
    const response = await fetch(ENDPOINTS.PREDICT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputData: formData,
        userId: 2, // Temporary userId for testing
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data; // Handle both wrapped and unwrapped responses
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
