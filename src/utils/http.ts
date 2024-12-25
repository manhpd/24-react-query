export async function fetchEvents(searchTerm: string = '') {

    let url = 'http://localhost:3000/events';
    if (searchTerm) {
        url += `?search=${searchTerm}`;
    }
    
    const response = await fetch(url);

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