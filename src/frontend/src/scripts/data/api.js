import CONFIG from '../config';

const ENDPOINTS = {
  PREDICT: `${CONFIG.BASE_URL}/api/predictions`,
};

export async function predictCareer(formData) {
  try {
    const response = await fetch(ENDPOINTS.PREDICT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputData: formData,
        userId: 1 // Temporary userId for testing
      })
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