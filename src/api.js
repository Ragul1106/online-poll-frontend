const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchPoll() {
  const res = await fetch(`${API_BASE}/api/poll`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load poll");
  return res.json();
}

export async function submitVote(option_id) {
  const res = await fetch(`${API_BASE}/api/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ option_id }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function fetchResults() {
  const res = await fetch(`${API_BASE}/api/results`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load results");
  return res.json();
}
