const API_URL = 'http://localhost:5000';

export async function logListEntries() {
 const response = await fetch(`${API_URL}/routes/logs`);
 return response.json();
};