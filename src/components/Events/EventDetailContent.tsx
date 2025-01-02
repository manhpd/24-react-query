import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, queryClient } from "../../utils/http";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock";

export default function EventDetailContent({ event }: any) {
    const navigate = useNavigate();

    const { data: deleteEventData, mutate, error: deleteError, isError: isDeleteError, isPending: isDeletePending } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
          // navigate to the events page after deleting the event
          navigate('/events');
          queryClient.invalidateQueries({ 
            queryKey: ['events'],
            refetchType : 'none' 
        });
        },
    });

    const handelDelete = () => {
        mutate({ id: event.id });
    }
      
    return (
        <article id="event-details">
        <header>
          <h1>{event.title}</h1>
          <nav>
            {isDeletePending && <p>Deleting event...</p>}
            
            {!isDeletePending && (
                <button onClick={handelDelete}>Delete</button>
            )}
            {isDeleteError &&  <ErrorBlock title="An error occurred" message={deleteError.message} />}
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
        <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{event.date} - {event.time}</time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </article>
    );
}