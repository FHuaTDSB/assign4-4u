import { IMAGE_BASE_URL, type ImagesResponse, PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {}, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Images</h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-5">
        {data ? (
          data.profiles.map((result) => (
            <div className="block bg-blue-900 text-cyan-300 rounded-lg overflow-hidden">
              <img className="w-full h-[280px] object-cover" src={`${IMAGE_BASE_URL}${result.file_path}`} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No credits available.</p>
        )}
      </div>
    </section>
  );

  return <></>;
};
