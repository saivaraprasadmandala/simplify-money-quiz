import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X, ArrowRight } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const {
    currentQuiz,
    currentQuestionIndex,
    selectedAnswer,
    answers,
    setSelectedAnswer,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (!currentQuiz) {
      router.replace('/');
      return;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, [currentQuiz, router]);

  if (!currentQuiz) return null;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isAnswered = currentQuestionIndex in answers;
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

  const handleOptionPress = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    submitAnswer();
  };

  const handleNext = () => {
    if (isLastQuestion) {
      router.push('/results');
    } else {
      nextQuestion();
    }
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return [
        styles.option,
        selectedAnswer === index && styles.selectedOption,
      ];
    }

    if (index === currentQuestion.correctAnswer) {
      return [styles.option, styles.correctOption];
    }

    if (index === answers[currentQuestionIndex]) {
      return [styles.option, styles.incorrectOption];
    }

    return styles.option;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.questionCount}>
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </Text>
        <Text style={styles.quizTitle}>{currentQuiz.title}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleOptionPress(index)}
            disabled={isAnswered}>
            <Text
              style={[
                styles.optionText,
                isAnswered && index === currentQuestion.correctAnswer && styles.correctOptionText,
                isAnswered && index === answers[currentQuestionIndex] && index !== currentQuestion.correctAnswer && styles.incorrectOptionText,
              ]}>
              {option}
            </Text>
            {isAnswered && index === currentQuestion.correctAnswer && (
              <Check size={20} color="#22c55e" />
            )}
            {isAnswered && index === answers[currentQuestionIndex] && index !== currentQuestion.correctAnswer && (
              <X size={20} color="#ef4444" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {!isAnswered ? (
          <TouchableOpacity
            style={[styles.button, !selectedAnswer && styles.buttonDisabled]}
            onPress={handleCheckAnswer}
            disabled={selectedAnswer === null}>
            <Text style={[styles.buttonText, !selectedAnswer && styles.buttonTextDisabled]}>
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.nextButton]} 
            onPress={handleNext}>
            <Text style={styles.buttonText}>
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  questionCount: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 24,
    lineHeight: 28,
  },
  option: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedOption: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  correctOption: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
    lineHeight: 24,
  },
  correctOptionText: {
    color: '#22c55e',
  },
  incorrectOptionText: {
    color: '#ef4444',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  nextButton: {
    backgroundColor: '#22c55e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#94a3b8',
  },
});