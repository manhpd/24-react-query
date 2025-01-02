import { useState } from 'react';

import ImagePicker from '../ImagePicker.js';

import { ReactNode } from 'react';
import { fetchSelectableImages } from '../../utils/http.js';
import { useQuery } from '@tanstack/react-query';

export default function EventForm({ inputData, onSubmit, children }: { inputData?: any, onSubmit: (data: any) => void, children: ReactNode }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['images'],
    queryFn: ({ signal }) => fetchSelectableImages({ signal }),
  });

  function handleSelectImage(image: string) {
    setSelectedImage(image);
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      <div className="control">
        {isLoading && <p>Loading images...</p>}
        {isError && <ErrorBlock title="An error occurred" message="Failed to fetch images" />}
        {!isLoading && !isError && data && (
           <ImagePicker
           images={data}
           onSelect={handleSelectImage}
           selectedImage={selectedImage}
         />
          )}
       
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
