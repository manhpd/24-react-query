import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.js';
import EventForm from './EventForm.js';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.js';

export default function NewEvent() {
  const navigate = useNavigate();

  const { data, mutate, isError, isPending, error  } = useMutation({
    mutationFn: createNewEvent,
  });

  function handleSubmit(formData: any) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Creating event...</p>}
        {!isPending && (
           <>
           <Link to="../" className="button-text">
             Cancel
           </Link>
           <button type="submit" className="button">
             Create
           </button>
         </>
        )}

       
      </EventForm>
      {isError && <ErrorBlock title="An error occurred" message={error.message} />}
    </Modal>
  );
}
