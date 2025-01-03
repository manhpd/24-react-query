import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.js';
import EventForm from './EventForm.jsx';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.js';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => {
      if (!id) {
        throw new Error('Event ID is required');
      }
      return fetchEvent({ id, signal });
    },
  });

  const { mutate, isPending, isError: isUpdateError, error: updateError } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = queryClient.getQueryData(['event', id]);

      await queryClient.cancelQueries({queryKey: ['event', id]});
      const previousEvent = queryClient.getQueryData(['event', id]);

      queryClient.setQueryData(['event', id], newEvent);
      
      return { previousEvent };
    },
    onError: (err, variables, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(['event', id], context.previousEvent);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['event', id]});
    },
  });

  function handleSubmit(formData: any) {
    if (id) {
      mutate({ id, event: formData });
    } else {
      console.error('Event ID is required');
    }

  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        {isPending && <p>Updating event...</p>}
        {!isPending && <button type="submit" className="button">Update</button>}
        
      </EventForm>
      {isUpdateError && <ErrorBlock title="An error occurred" message={updateError.message} />}
    </Modal>
  );
}
