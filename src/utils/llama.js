export const llamaModel = async (query) => {
    const response = await fetch('/api/llama', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch from AI Model: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content;
}