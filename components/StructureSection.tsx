
import React, { useState } from 'react';
import { generateMaterial } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ContentDisplay from './ContentDisplay';

interface StructureSectionProps {
  onBack: () => void;
}

const subTopics = [
  "Subject-Verb Agreement",
  "Clauses & Connectors",
  "Parallel Structure",
  "Comparisons & Superlatives",
  "Appositives",
  "Error Identification Strategies",
];

const StructureSection: React.FC<StructureSectionProps> = ({ onBack }) => {
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
      You are a TOEFL ITP expert grammar tutor.
      Explain the material for the "Structure and Written Expression" section on the topic of "${topic}" comprehensively.
      
      Your explanation must include:
      1.  **Core Concept**: A clear explanation of the grammar rule.
      2.  **Examples**: Show examples of correct and incorrect sentences to illustrate the rule.
      3.  **Example Question**: Provide a typical TOEFL-style question for this topic (either sentence completion or error identification).
      4.  **Detailed Analysis**: Explain the answer to the example question, detailing why the correct choice is right and others are wrong.
      
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
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Structure & Written Expression</h2>
        <button
          onClick={onBack}
          className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
        >
          &larr; Back
        </button>
      </div>
      <p className="mb-6 text-slate-600">
        Pilih topik tata bahasa di bawah ini untuk mempelajari aturan, contoh, dan strategi menjawab soal.
      </p>
      <div className="flex flex-wrap gap-3 mb-8">
        {subTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className={`py-2 px-4 rounded-full font-semibold transition-all text-sm sm:text-base ${
              activeTopic === topic
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
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

export default StructureSection;
