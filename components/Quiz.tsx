
import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, QuizSection } from '../types';
import { generateJsonMaterial, generateMaterial } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
// FIX: Imported the ContentDisplay component to resolve the "Cannot find name" error.
import ContentDisplay from './ContentDisplay';

interface QuizProps {
  section: QuizSection;
  onBack: () => void;
}

const getQuestionPrompt = (section: QuizSection): string => {
  const base = `You are a TOEFL ITP expert. Generate a practice question for the "${section}" section. Provide the response as a single, valid JSON object.`;
  const schema = `The JSON object must have these keys: "question" (string), "options" (an object with keys "A", "B", "C", "D" and string values), and "answer" (a string containing the key of the correct option, e.g., "A").`;
  
  switch (section) {
    case 'Listening':
      return `${base} The question should be for Part A (Short Conversations). ${schema} Also include an "audioScript" key (string) with a short dialogue.`;
    case 'Structure':
      return `${base} The question should be a sentence completion task. Use '____' to indicate the blank. ${schema}`;
    case 'Reading':
      return `${base} ${schema} Also include a "passage" key (string) with a short academic paragraph (around 100-150 words).`;
  }
};

const getAnalysisPrompt = (questionData: QuizQuestion, userAnswer: string): string => {
  const { question, options, answer } = questionData;
  const isCorrect = userAnswer === answer;
  const correctness = isCorrect ? "benar" : "salah";

  return `
    You are a TOEFL ITP tutor. A student answered a practice question.
    - The question was: "${questionData.passage || questionData.audioScript || ''} ${question}"
    - The options were: ${JSON.stringify(options)}
    - The correct answer is: (${answer}) ${options[answer]}
    - The student's answer was: (${userAnswer}) ${options[userAnswer]}, which was ${correctness}.

    Provide a concise analysis in Indonesian.
    1.  Start by confirming the correct answer.
    2.  Explain clearly and simply why the correct answer is right.
    3.  If the student was wrong, briefly explain the mistake in their choice.
    
    Format the response in simple Markdown.
  `;
};

const Quiz: React.FC<QuizProps> = ({ section, onBack }) => {
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setQuestionData(null);
    setSelectedAnswer(null);
    setSubmitted(false);
    setIsCorrect(null);
    setAnalysis(null);

    try {
      const prompt = getQuestionPrompt(section);
      const data = await generateJsonMaterial<QuizQuestion>(prompt);
      setQuestionData(data);
    } catch (e) {
      setError('Gagal memuat soal. Silakan coba lagi.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleSubmit = async () => {
    if (!selectedAnswer || !questionData) return;

    setSubmitted(true);
    const correct = selectedAnswer === questionData.answer;
    setIsCorrect(correct);

    setLoadingAnalysis(true);
    const analysisPrompt = getAnalysisPrompt(questionData, selectedAnswer);
    const analysisResult = await generateMaterial(analysisPrompt);
    setAnalysis(analysisResult);
    setLoadingAnalysis(false);
  };
  
  const getOptionClass = (optionKey: string) => {
    if (!submitted) {
      return selectedAnswer === optionKey ? 'bg-indigo-200 border-indigo-500' : 'bg-white hover:bg-slate-50';
    }
    if (optionKey === questionData?.answer) {
      return 'bg-green-100 border-green-500 text-green-800 font-bold';
    }
    if (optionKey === selectedAnswer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-slate-100 text-slate-500';
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!questionData) return <div className="text-center text-slate-500">Tidak ada soal tersedia.</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{section} Practice</h2>
        <button onClick={onBack} className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
          &larr; Pilih Seksi
        </button>
      </div>
      
      <div className="space-y-6">
        {questionData.passage && <div className="p-4 bg-slate-100 rounded-md prose max-w-none"><p>{questionData.passage}</p></div>}
        {questionData.audioScript && <div className="p-4 bg-slate-100 rounded-md prose max-w-none">
            <h4 className="font-bold">Transkrip Audio:</h4>
            <p className="italic">{questionData.audioScript}</p>
        </div>}

        <p className="text-lg text-slate-800 font-medium">{questionData.question}</p>

        <div className="space-y-3">
          {Object.entries(questionData.options).map(([key, value]) => (
            <button
              key={key}
              disabled={submitted}
              onClick={() => setSelectedAnswer(key)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${getOptionClass(key)}`}
            >
              <span className="font-bold mr-3">{key}.</span>{value}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Submit Jawaban
          </button>
        ) : (
          <button
            onClick={fetchQuestion}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700"
          >
            Soal Berikutnya &rarr;
          </button>
        )}

        {submitted && (
          <div className="mt-6 p-4 rounded-lg bg-slate-50 border">
            {loadingAnalysis ? (
                <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-t-indigo-500 border-slate-200 rounded-full animate-spin"></div>
                    <p className="ml-3 text-slate-600">Menganalisis jawaban...</p>
                </div>
            ) : (
              <>
                <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}
                </h3>
                {analysis && <ContentDisplay content={analysis} />}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
