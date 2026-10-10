/* ---------- Saving searches (per logged-in user, in the browser) ---------- */

const keyFor = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return `trafficiq_history_${user?.email || "guest"}`;
  } catch {
    return "trafficiq_history_guest";
  }
};

export function getSearches() {
  try {
    return JSON.parse(localStorage.getItem(keyFor())) || [];
  } catch {
    return [];
  }
}

export function saveSearch(entry) {
  const item = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...entry,
  };
  const list = [item, ...getSearches()].slice(0, 50);
  localStorage.setItem(keyFor(), JSON.stringify(list));
  return item.id;
}

export function clearSearches() {
  localStorage.removeItem(keyFor());
}

/* ---------- SAMPLE past traffic data ----------
   Replace buildSampleHistory with a call to the backend when the real
   historical data is ready. It should return the same shape:
   { hourly, daily, best, peak, average } */

// The same text always gives the same numbers, so the chart does not
// change every time the page is refreshed.
function seededRandom(text) {
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  }
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

const HOURS = [6, 8, 10, 12, 14, 16, 18, 20, 22];
const HOUR_FACTOR = { 6: 0.9, 8: 1.35, 10: 1.1, 12: 1.05, 14: 1.05, 16: 1.2, 18: 1.45, 20: 1.1, 22: 0.9 };
const DAY_FACTOR = [0.9, 1.2, 1.15, 1.15, 1.2, 1.3, 1.0]; // Sunday to Saturday

const hourLabel = (h) => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "AM" : "PM"}`;

const addLevels = (items) => {
  const min = Math.min(...items.map((d) => d.value));
  return items.map((d) => {
    const ratio = d.value / min;
    const level = ratio < 1.15 ? "Low" : ratio < 1.35 ? "Moderate" : "Heavy";
    return { ...d, level };
  });
};

export function buildSampleHistory(entry) {
  const rand = seededRandom(`${entry.from}|${entry.to}`);
  const base = Math.max(5, entry.minutes);
  const noise = () => 1 + (rand() - 0.5) * 0.16;

  const hourly = addLevels(
    HOURS.map((h) => ({
      label: hourLabel(h),
      value: Math.round(base * HOUR_FACTOR[h] * noise()),
    }))
  );

  const today = new Date();
  const dailyRaw = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dailyRaw.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      value: Math.round(base * 1.1 * DAY_FACTOR[d.getDay()] * noise()),
    });
  }
  const daily = addLevels(dailyRaw);

  const best = hourly.reduce((a, b) => (b.value < a.value ? b : a));
  const peak = hourly.reduce((a, b) => (b.value > a.value ? b : a));
  const average = Math.round(
    hourly.reduce((sum, d) => sum + d.value, 0) / hourly.length
  );

  return { hourly, daily, best, peak, average };
}