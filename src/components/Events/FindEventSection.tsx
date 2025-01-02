import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../utils/http';
import EventItem from './EventItem';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';

export default function FindEventSection() {
  const searchElement = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['events', { search: searchTerm }],
    queryFn: ({signal}) => fetchEvents({signal, searchTerm}),
    // disable the query when the search term is empty
    enabled: searchTerm !== undefined,
  });

  let content: JSX.Element | string = "";
  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = <ErrorBlock title="An error occurred" message="Failed to fetch events" />;
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event: any) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchElement.current) {
      setSearchTerm(searchElement.current.value);
    }
  }


  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>
      {content}
    </section>
  );
}
