const API_URL = 'http://localhost:5000';

export async function logListEntries() {
 const response = await fetch(`${API_URL}/routes/logs`);
 return response.json();
};

export async function createLogEntry(entry) {
    const response = await fetch(`${API_URL}/routes/logs`, {
        method: "POST",
        headers: {
            "content-type" : 'application/json',
        },
        body: JSON.stringify(entry),
    });
    
   };