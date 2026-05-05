import { Button, DetailItem, LinkGroup } from '@/components';
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { FaCalendar, FaLongArrowAltLeft, FaStar } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-full text-gray-100 w-3/4 justify-self-center">
      <div className="p-5 pb-0">
        <Button onClick={() => navigate(-1)}>
          <div className="flex items-center gap-2">
            <FaLongArrowAltLeft /> Back
          </div>
        </Button>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-5 p-5 min-h-0">
        <img className="w-[200px] object-cover rounded-xl" src={getImageUrl(data.profile_path)} alt={data.name} />
        <div className="overflow-y-auto space-y-4">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <DetailItem label="Birth Date" value={data.birthday} icon={<FaCalendar />} />
            <DetailItem label="Place of Birth" value={data.place_of_birth} icon={<FaStar />} />
          </div>
          <p className="text-gray-300 leading-relaxed">{data.biography}</p>
          <LinkGroup
            options={[
              { label: 'Career', to: 'career' },
              { label: 'Images', to: 'images' },
            ]}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
