# Simplify Money - React Native Quiz App

A mobile quiz application built with React Native for the Simplify Money Internship Assessment.

## 1. Solution Overview

**Assignment Chosen:** React-Frontend (Quiz Game Mobile App)

**Repo Link:** [github.com/saivaraprasadmandala/simplify-money-quiz](https://github.com/saivaraprasadmandala/simplify-money-quiz)

**Live Demo Link:** [Simplify Money Quiz Assessment Live Demo](https://drive.google.com/file/d/1uHkYLb5zBQi-Ix7QWb3HWxVvgtPnCe1F/view)

**Deployment:** Local execution via Expo (Android/iOS) — no backend required.




### 📱 Screenshots


## Quiz List  
![Quiz List Screenshot](https://github.com/user-attachments/assets/6d4694cb-106b-423d-8ee5-afc00ef1f97b)

## Quiz Screen  
![Quiz Screen Screenshot](https://github.com/user-attachments/assets/02cd82d8-b1c9-442e-8011-ee2741d11c70)

## Results Screen  
![Results Screen Screenshot](https://github.com/user-attachments/assets/4ad73b20-bc49-41d5-959d-ff12d13f7797)

## 🎯 Features

✅ **Quiz List Screen**: Displays 2 quizzes with descriptions.

✅ **Interactive Quiz Flow**:
- Single-choice questions with option highlighting.
- Real-time answer validation (green/red indicators).
- Progress bar tracking.

✅ **Results Screen**:
- Score summary (correct/incorrect counts).
- Percentage-based grading with color coding.
- Detailed question-wise feedback.

✅ **Bonus Features**:
- Blocked device back button during quizzes.
- Display the correct and incorrect question summary on result screen

## 🛠️ Tech Stack
- **Framework**: React Native (Expo)
- **State Management**: Zustand
- **Navigation**: Expo Router
- **UI**: Native Styles + Lucide Icons

## 🚀 How to Run

```sh
# Clone the repo
git clone https://github.com/saivaraprasadmandala/simplify-money-quiz.git
cd simplify-money-quiz

# Install dependencies
yarn install  # or npm install

# Start the app in terminal
npm run dev
```

Scan the QR code with Expo Go (mobile) or use an emulator.

## 3. Approach & Challenges

### **Problem-Solving Approach & Decision-Making**
To ensure a smooth and interactive quiz experience, key decisions were made:
- **State Management:** Zustand was chosen for its lightweight and efficient state handling, ensuring global quiz state (answers, progress) remains synchronized.
- **Navigation:** Expo Router was selected for seamless navigation, with the back button blocked using `BackHandler` to prevent users from accidentally leaving the quiz.
- **UI/UX Design:**
  - Dynamic styling for correct/incorrect answers (green/red highlights) improves user feedback.
  - A progress bar was implemented to help users track their completion status.
  - Clear, color-coded result breakdown to enhance user engagement.

### **Challenges & How They Were Handled**
✅ **Solved Challenges:**
- **Smooth State Management:** Zustand provided an efficient way to maintain quiz state across screens without unnecessary re-renders.
- **Answer Validation & Feedback:** Immediate answer validation was implemented using dynamic styling, offering real-time feedback.
- **Navigation Constraints:** The back button was disabled during the quiz to prevent accidental exits.

⚠️ **Unsolved Edge Cases & Future Improvements:**
- **Network Resilience:** Currently, the app is local-only, but future versions could integrate API-driven quizzes, requiring error handling for network failures.
- **Timer for Questions:** A countdown timer per question could improve engagement but is not yet implemented.
- **More Quizzes & Question Types:** Future enhancements could support different quiz formats like multiple-choice or timed quizzes.

### **Code Quality & Implementation Strategy**
- **Modular Components:** The app follows a structured component-based approach, making it scalable and maintainable.
- **Efficient State Handling:** Zustand ensures minimal re-renders, keeping the app performant.
- **Styling & UI Best Practices:** The UI maintains a native feel with a clean and user-friendly design.
