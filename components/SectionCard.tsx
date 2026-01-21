
import React from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  large?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, icon, onClick, color, large = false }) => {
  return (
    <button
      onClick={onClick}
      className={`group rounded-xl bg-gradient-to-br ${color} p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform ${large ? 'md:col-span-1' : ''}`}
    >
      <div className={`flex flex-col items-start h-full ${large ? 'min-h-[200px]' : ''}`}>
        <div className="bg-white/20 rounded-lg p-3 mb-4">
          {icon}
        </div>
        <h2 className={`font-bold text-left mb-2 ${large ? 'text-3xl' : 'text-2xl'}`}>{title}</h2>
        <p className="text-left text-white/90 flex-grow">{description}</p>
        <div className={`mt-6 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${large ? 'text-lg' : 'text-sm'}`}>
          {large ? 'Pilih Mode Ini' : 'Mulai Belajar'} &rarr;
        </div>
      </div>
    </button>
  );
};

export default SectionCard;
