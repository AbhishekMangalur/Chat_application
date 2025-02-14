const API_URL = "http://localhost:1337/api/auth/local";

export async function login(username, password) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || "Login failed");
  }
  return data;
}

export async function signup(username, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || "Signup failed");
  }
  return data;
}
