import { create } from 'zustand';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  answers: { [key: number]: number };
  setCurrentQuiz: (quiz: Quiz) => void;
  setSelectedAnswer: (answer: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

// Sample quiz data
const quizData: Quiz[] = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics',
    questions: [
      {
        id: 1,
        text: 'What is the result of typeof null?',
        options: ['undefined', 'object', 'null', 'number'],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: 'Which method removes the last element from an array?',
        options: ['pop()', 'push()', 'shift()', 'unshift()'],
        correctAnswer: 0,
      },
      {
        id: 3,
        text: 'What is the output of 2 + "2"?',
        options: ['4', '"22"', '22', 'NaN'],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'Which operator is used for strict equality comparison?',
        options: ['==', '===', '=', '!='],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: 'What is the scope of a variable declared with let?',
        options: ['Global scope', 'Function scope', 'Block scope', 'Module scope'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'React Native Basics',
    description: 'Test your React Native knowledge',
    questions: [
      {
        id: 1,
        text: 'Which component is used to create a scrollable list?',
        options: ['ScrollView', 'ListView', 'FlatList', 'List'],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the purpose of the StyleSheet.create method?',
        options: [
          'To create inline styles',
          'To optimize style performance',
          'To validate styles',
          'To merge styles',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'Which hook is used for side effects in React Native?',
        options: ['useState', 'useEffect', 'useCallback', 'useMemo'],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is the main difference between View and Fragment?',
        options: [
          'View renders a DOM node, Fragment does not',
          'Fragment is faster than View',
          'View can have styles, Fragment cannot',
          'There is no difference',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'Which prop is used to handle press events on buttons?',
        options: ['onClick', 'onPress', 'onTouch', 'onTap'],
        correctAnswer: 1,
      },
    ],
  },
];

export const useQuizStore = create<QuizState>((set, get) => ({
  quizzes: quizData,
  currentQuiz: null,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  answers: {},

  setCurrentQuiz: (quiz) => {
    set({ currentQuiz: quiz, currentQuestionIndex: 0, selectedAnswer: null, answers: {} });
  },

  setSelectedAnswer: (answer) => {
    set({ selectedAnswer: answer });
  },

  submitAnswer: () => {
    const { currentQuiz, currentQuestionIndex, selectedAnswer, answers } = get();
    if (currentQuiz && selectedAnswer !== null) {
      set({
        answers: {
          ...answers,
          [currentQuestionIndex]: selectedAnswer,
        },
      });
    }
  },

  nextQuestion: () => {
    const { currentQuestionIndex, currentQuiz } = get();
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedAnswer: null,
      });
    }
  },

  resetQuiz: () => {
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answers: {},
    });
  },
}));