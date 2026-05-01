import type { ReactNode } from 'react';

type DetailItemProps = {
  label: string;
  icon?: ReactNode;
  value: string | number;
};

export const DetailItem = ({ label, value, icon }: DetailItemProps) => {
  return (
    <div className="bg-blue-800/60 rounded-lg p-3 flex gap-2 items-center">
      {icon}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
};
