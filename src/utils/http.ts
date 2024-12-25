export async function fetchEvents() {
    const response = await fetch('http://localhost:3000/events');

    if (!response.ok) {
        class FetchError extends Error {
            code: number;
            info: any;
            constructor(message: string, code: number, info: any) {
                super(message);
                this.code = code;
                this.info = info;
            }
        }

        const error = new FetchError('An error occurred while fetching the events', response.status, await response.json());
        throw error;
    }

    const { events } = await response.json();

    return events;
}