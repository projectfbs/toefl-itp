
import React, { useState } from 'react';
import { QuizSection } from '../types';
import Quiz from './Quiz';

interface PracticeSectionProps {
  onBack: () => void;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ onBack }) => {
  const [currentQuiz, setCurrentQuiz] = useState<QuizSection | null>(null);

  if (currentQuiz) {
    return <Quiz section={currentQuiz} onBack={() => setCurrentQuiz(null)} />;
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Latihan Soal</h2>
        <button
          onClick={onBack}
          className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
        >
          &larr; Halaman Utama
        </button>
      </div>
      <p className="mb-8 text-slate-600">
        Pilih salah satu seksi untuk memulai latihan. AI akan membuatkan soal-soal untuk Anda secara berkelanjutan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setCurrentQuiz('Listening')}
          className="p-6 bg-gradient-to-br from-sky-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <h3 className="text-xl font-bold">Listening Comprehension</h3>
          <p className="text-sm opacity-90 mt-1">Latih kemampuan mendengar Anda.</p>
        </button>
        <button
          onClick={() => setCurrentQuiz('Structure')}
          className="p-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <h3 className="text-xl font-bold">Structure & Written Expression</h3>
          <p className="text-sm opacity-90 mt-1">Uji pengetahuan tata bahasa Anda.</p>
        </button>
        <button
          onClick={() => setCurrentQuiz('Reading')}
          className="p-6 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <h3 className="text-xl font-bold">Reading Comprehension</h3>
          <p className="text-sm opacity-90 mt-1">Tingkatkan pemahaman bacaan Anda.</p>
        </button>
      </div>
    </div>
  );
};

export default PracticeSection;
