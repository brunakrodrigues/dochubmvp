import { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '@/data/questions';

export interface User {
  name: string;
  email: string;
  specialty: string;
  city: string;
  state: string;
  ageRange: string;
}

export interface Answer {
  questionId: number;
  selectedValue: number;
  category: string;
}

export interface TestResult {
  totalScore: number;
  maxScore: number;
  level: 'iniciante' | 'intermediario' | 'avancado' | 'mentor';
  categoryScores: { category: string; score: number; maxScore: number }[];
  testType: 'free' | 'complete';
}

interface AppState {
  user: User | null;
  testType: 'free' | 'complete';
  answers: Answer[];
  result: TestResult | null;
  setUser: (user: User) => void;
  setTestType: (type: 'free' | 'complete') => void;
  addAnswer: (answer: Answer) => void;
  setAnswers: (answers: Answer[]) => void;
  setResult: (result: TestResult) => void;
  reset: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [testType, setTestType] = useState<'free' | 'complete'>('free');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  const addAnswer = (answer: Answer) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== answer.questionId);
      return [...filtered, answer];
    });
  };

  const reset = () => {
    setUser(null);
    setTestType('free');
    setAnswers([]);
    setResult(null);
  };

  return (
    <AppContext.Provider value={{ user, testType, answers, result, setUser, setTestType, addAnswer, setAnswers, setResult, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
