import { Link, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.js';
import { fetchEvent } from '../../utils/http.js';
import { useQuery } from '@tanstack/react-query';
import EventDetailContent from './EventDetailContent.js';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }: { signal: AbortSignal }) => {
      if (!id) {
        throw new Error('Event ID is required');
      }
      return fetchEvent({ id, signal });
    },
  });
  
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      {isLoading && <p>Loading event...</p>}
      {isError && <p>Error: {error.message}</p>}

      {!isLoading && !isError && data && (
        <EventDetailContent event={data} />
      )}
      
    </>
  );
}
