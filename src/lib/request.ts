/**
 * Thin wrapper around fetch which throws errors when things go wrong.
 */
export default async function request(url: string, init?: RequestInit) {
    const res = await fetch(url, init);

    if (res.status !== 200) {
        let message = '';
        try {
            const body = await res.json();
            message = body.message || '';
        } catch {
            message = `Unexpected error: ${res.status}`;
        }
        throw new Error(message);
    }

    return await res.json();
}
