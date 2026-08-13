export const fetchFromTMDB = async (endpoint) => {
    const response = await fetch(`/api/tmdb?endpoint=${encodeURIComponent(endpoint)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch from TMDB: ${response.statusText}`);
    }
    return response.json();
}
