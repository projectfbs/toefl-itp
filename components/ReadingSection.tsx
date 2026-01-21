
import React, { useState } from 'react';
import { generateMaterial } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ContentDisplay from './ContentDisplay';

interface ReadingSectionProps {
  onBack: () => void;
}

const subTopics = [
  "Main Idea Questions",
  "Detail & Fact Questions",
  "Vocabulary in Context",
  "Inference Questions",
  "Author's Purpose Questions",
  "Skimming & Scanning Techniques",
];

const ReadingSection: React.FC<ReadingSectionProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleTopicClick = async (topic: string) => {
    setActiveTopic(topic);
    setLoading(true);
    setContent(null);
    setError(null);
    const prompt = `
      You are a TOEFL ITP expert reading comprehension tutor.
      Explain the material for the "Reading Comprehension" section on the topic of "${topic}" comprehensively.
      
      Your explanation must include:
      1.  **Skill Overview**: What this type of question is asking and why it's important.
      2.  **Strategies**: Specific, actionable strategies for finding the answer in the passage quickly and accurately.
      3.  **Example Passage**: Provide a short academic-style passage (around 100-150 words).
      4.  **Example Question**: Create a question related to the topic based on the passage.
      5.  **Detailed Analysis**: Explain how to use the strategies to arrive at the correct answer, and why other options are incorrect.
      
      Format the entire response in simple Markdown. Use headings, bold text, and lists to make it easy to read.
      The language must be in Indonesian.
    `;
    const result = await generateMaterial(prompt);
    if (result.startsWith('Error')) {
      setError(result);
    } else {
      setContent(result);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Reading Comprehension</h2>
        <button
          onClick={onBack}
          className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
        >
          &larr; Back
        </button>
      </div>
      <p className="mb-6 text-slate-600">
        Pilih jenis pertanyaan atau skill membaca di bawah ini untuk mempelajari strategi dan melihat contoh soal.
      </p>
      <div className="flex flex-wrap gap-3 mb-8">
        {subTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className={`py-2 px-4 rounded-full font-semibold transition-all text-sm sm:text-base ${
              activeTopic === topic
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 sm:p-6 bg-slate-50 rounded-lg min-h-[200px]">
        {loading && <LoadingSpinner />}
        {error && <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
        {content && <ContentDisplay content={content} />}
        {!loading && !content && !error && (
            <div className="text-center text-slate-500 py-10">
                <p>Pilih salah satu topik untuk memulai belajar.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ReadingSection;
