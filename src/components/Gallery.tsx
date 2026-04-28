import type { ImageCell } from '@/core';
import { IMAGE_BASE_URL } from '@/core/constants';

type GalleryProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  onClick?: (id: ImageCell) => void;
};

export const Gallery = ({ results, onClick }: GalleryProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-5">
      {results.map((result) => (
        <div
          key={result.id}
          className="block bg-blue-900 text-cyan-300 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] hover:bg-fuchsia-700 hover:text-white transition"
          onClick={() => onClick?.(result)}
        >
          <img className="w-full h-[280px] object-cover" src={`${IMAGE_BASE_URL}${result.imagePath}`} alt={result.primaryText} />
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
