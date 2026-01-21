
import React, { useState } from 'react';
import { Section } from './types';
import Header from './components/Header';
import SectionCard from './components/SectionCard';
import ListeningSection from './components/ListeningSection';
import StructureSection from './components/StructureSection';
import ReadingSection from './components/ReadingSection';
import PracticeSection from './components/PracticeSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.NONE);

  const renderHomePage = () => (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800">Pilih Mode Belajar</h2>
        <p className="mt-2 text-slate-600">Mulai dengan mempelajari materi atau langsung coba latihan soal.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 max-w-4xl mx-auto">
        <SectionCard
          title="Materi Belajar"
          description="Pelajari konsep, strategi, dan contoh soal untuk setiap bagian."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
            </svg>
          }
          onClick={() => setActiveSection(Section.MATERIAL_SELECTION)}
          color="from-sky-500 to-indigo-500"
          large
        />
        <SectionCard
          title="Latihan Soal"
          description="Uji pemahaman Anda dengan soal-soal yang dibuat oleh AI."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          onClick={() => setActiveSection(Section.PRACTICE)}
          color="from-purple-500 to-pink-500"
          large
        />
      </div>
    </>
  );

  const renderMaterialSelectionPage = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Materi Belajar</h2>
        <button
          onClick={() => setActiveSection(Section.NONE)}
          className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
        >
          &larr; Halaman Utama
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SectionCard
          title="Listening Comprehension"
          description="Master skills for understanding spoken English in academic contexts."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 5.858a3 3 0 104.243 4.243L5.858 14.343a3 3 0 00-4.243-4.243m11.314-5.657a3 3 0 10-4.243 4.243L17.172 10a3 3 0 004.243-4.243m-2.829 8.485a3 3 0 10-4.242-4.242l-4.243 4.242a3 3 0 004.242 4.242" />
            </svg>
          }
          onClick={() => setActiveSection(Section.LISTENING)}
          color="from-sky-500 to-indigo-500"
        />
        <SectionCard
          title="Structure & Written Expression"
          description="Improve your grammar and ability to identify errors in written English."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
          onClick={() => setActiveSection(Section.STRUCTURE)}
          color="from-emerald-500 to-teal-500"
        />
        <SectionCard
          title="Reading Comprehension"
          description="Enhance your ability to read and understand academic passages."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
            </svg>
          }
          onClick={() => setActiveSection(Section.READING)}
          color="from-amber-500 to-orange-500"
        />
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case Section.LISTENING:
        return <ListeningSection onBack={() => setActiveSection(Section.MATERIAL_SELECTION)} />;
      case Section.STRUCTURE:
        return <StructureSection onBack={() => setActiveSection(Section.MATERIAL_SELECTION)} />;
      case Section.READING:
        return <ReadingSection onBack={() => setActiveSection(Section.MATERIAL_SELECTION)} />;
      case Section.PRACTICE:
        return <PracticeSection onBack={() => setActiveSection(Section.NONE)} />;
      case Section.MATERIAL_SELECTION:
        return renderMaterialSelectionPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by AI. Materi dan soal dihasilkan untuk tujuan edukasi.</p>
      </footer>
    </div>
  );
};

export default App;
