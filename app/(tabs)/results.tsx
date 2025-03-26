import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuizStore } from '@/store/quizStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Check, X, ArrowRight } from 'lucide-react-native';

export default function ResultsScreen() {
  const router = useRouter();
  const { currentQuiz, answers, resetQuiz } = useQuizStore();

  if (!currentQuiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Trophy size={32} color="#6366f1" />
          <Text style={styles.title}>No Results Yet</Text>
        </View>
        <Text style={styles.noResults}>Complete a quiz to see your results!</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Take a Quiz</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const correctAnswers = Object.entries(answers).filter(
    ([index, answer]) => answer === currentQuiz.questions[Number(index)].correctAnswer
  ).length;

  const percentage = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
  const getGradeColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    return '#ef4444';
  };

  const handleTryAgain = () => {
    resetQuiz();
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Trophy size={32} color="#6366f1" />
        <Text style={styles.title}>Quiz Results</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.scoreCard}>
          <Text style={styles.quizTitle}>{currentQuiz.title}</Text>
          <View style={styles.scoreContainer}>
            <View>
              <Text style={styles.scoreLabel}>Your Score</Text>
              <Text style={styles.score}>
                {correctAnswers} / {currentQuiz.questions.length}
              </Text>
            </View>
            <View style={[styles.percentageContainer, { backgroundColor: getGradeColor(percentage) + '20' }]}>
              <Text style={[styles.percentage, { color: getGradeColor(percentage) }]}>
                {percentage}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Question Summary</Text>
          {currentQuiz.questions.map((question, index) => {
            const isCorrect = answers[index] === question.correctAnswer;
            return (
              <View key={index} style={styles.questionResult}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>Question {index + 1}</Text>
                  {isCorrect ? (
                    <View style={[styles.badge, styles.correctBadge]}>
                      <Check size={16} color="#22c55e" />
                      <Text style={styles.correctText}>Correct</Text>
                    </View>
                  ) : (
                    <View style={[styles.badge, styles.incorrectBadge]}>
                      <X size={16} color="#ef4444" />
                      <Text style={styles.incorrectText}>Incorrect</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.questionText}>{question.text}</Text>
                <Text style={styles.answerText}>
                  Your answer: {question.options[answers[index]]}
                </Text>
                {!isCorrect && (
                  <Text style={styles.correctAnswer}>
                    Correct answer: {question.options[question.correctAnswer]}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
        <Text style={styles.buttonText}>Try Another Quiz</Text>
        <ArrowRight size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  noResults: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 24,
  },
  scoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
  },
  percentageContainer: {
    padding: 12,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  summary: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  questionResult: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  correctBadge: {
    backgroundColor: '#f0fdf4',
  },
  incorrectBadge: {
    backgroundColor: '#fef2f2',
  },
  correctText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22c55e',
  },
  incorrectText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ef4444',
  },
  questionText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 12,
    lineHeight: 24,
  },
  answerText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  correctAnswer: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});