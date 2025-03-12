const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache duration

export const fetchWithCache = async (url) => {
  const cachedData = localStorage.getItem(url);
  const cachedTime = localStorage.getItem(`${url}-timestamp`);

  if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(url, JSON.stringify(data));
    localStorage.setItem(`${url}-timestamp`, Date.now());
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};
