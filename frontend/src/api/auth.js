// Set to false when the backend is ready
const USE_MOCK = true;

const API_URL = "http://localhost:5000";

async function request(path, body) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    data = {};
  }

  console.log(path, res.status, text);

  if (!res.ok) {
    throw new Error(data.message || `Request failed (status ${res.status}).`);
  }
  return data;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function signupUser({ name, email, password }) {
  if (USE_MOCK) {
    await wait(500);
    localStorage.setItem("mockProfile", JSON.stringify({ name, email }));
    return { message: "Account created (mock)" };
  }
  return request("/api/auth/signup", { name, email, password });
}

export async function loginUser({ email, password }) {
  if (USE_MOCK) {
    await wait(500);
    const saved = JSON.parse(localStorage.getItem("mockProfile"));
    const name =
      saved && saved.email === email ? saved.name : email.split("@")[0];
    return { token: "mock-token", user: { name, email } };
  }

  const data = await request("/api/auth/login", { email, password });
  return {
    token: data.token || data.accessToken,
    user: data.user || { name: data.name, email: data.email },
  };
}