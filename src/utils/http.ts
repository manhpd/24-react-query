import { QueryClient } from "@tanstack/react-query";


export const queryClient = new QueryClient();
class CustomError extends Error {
  code: number;
  info?: any;

  constructor(message: string, code: number, info?: any) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

export async function fetchEvents({ signal, searchTerm }: { signal: AbortSignal; searchTerm?: string }) {
  console.log(searchTerm);

  // Mocking events since the backend is not ready
  const events = [
    { id: '1', name: 'Event 1', date: '2023-01-01' },
    { id: '2', name: 'Event 2', date: '2023-02-01' },
    { id: '3', name: 'Event 3', date: '2023-03-01' },
  ];

  if (searchTerm) {
    return events.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return events;

}

export async function createNewEvent(eventData: any) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const info = await response.json();
    throw new CustomError('An error occurred while creating the event', response.status, info);
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }: { signal: AbortSignal }) {
    const response = await fetch(`http://localhost:3000/events/images`, { signal });
  
    if (!response.ok) {
      const info = await response.json();
      throw new CustomError('An error occurred while fetching the images', response.status, info);
    }
  
    const { images } = await response.json();
  
    return images;
  }

  export async function fetchEvent({ id, signal }: { id: string; signal: AbortSignal }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, { signal });
  
    if (!response.ok) {
      const error = new CustomError('An error occurred while fetching the event', response.status, await response.json());
      throw error;
    }
  
    const { event } = await response.json();
  
    return event;
  }
  
  
  export async function deleteEvent({ id }: { id: string }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const error = new CustomError('An error occurred while deleting the event', response.status, await response.json());
      throw error;
    }
  
    return response.json();
  }

  export async function updateEvent({ id, event }: { id: string; event: any }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ event }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const info = await response.json();
      throw new CustomError('An error occurred while updating the event', response.status, info);
    }
  
    return response.json();
  }