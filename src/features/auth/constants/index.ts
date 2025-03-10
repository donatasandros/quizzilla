export const FEATURES = [
  {
    id: "dc5f79d6-6537-4de0-8c44-d94d613de292",
    name: "Introducing Smart Quizzes",
    description:
      "Unlock personalized quizzes that adapt to each user's level, enhancing engagement and retention.",
    image: "https://placehold.co/472x300/png?text=Smart+Quizzes",
  },
  {
    id: "224044e0-4304-4846-a40a-1754e45b3da4",
    name: "Real-Time Results",
    description:
      "Get instant feedback with live quiz results, allowing users to track progress and improve their skills faster.",
    image: "https://placehold.co/472x300/png?text=Real-Time+Results",
  },
  {
    id: "36b9a0fc-c95e-455d-9cbc-3f5af2e18658",
    name: "Advanced Analytics Dashboard",
    description:
      " Dive deep into performance data with an intuitive dashboard, offering actionable insights to improve your quiz experience.",
    image: "https://placehold.co/472x300/png?text=Advanced+Analytics+Dashboard",
  },
  {
    id: "50f24425-505f-4aeb-9834-8ed8638675ed",
    name: "Customizable Quiz Themes",
    description:
      "Personalize your quizzes with a variety of themes and styles, making each quiz unique and engaging for your users.",
    image: "https://placehold.co/472x300/png?text=Customizable+Quiz+Themes",
  },
];

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS:
    "We couldn't find an account matching those credentials. Double-check and try again.",
  INTERNAL_ERROR:
    "Something went wrong on our end. Please try again later. If the issue persists, please contact us.",
  USER_ALREADY_EXISTS:
    "An account with this email already exists. Try signing in or use a different email.",
  INVALID_TOKEN:
    "This reset link is invalid or has expired. Request a new one and try again.",
} as const;

export const DEFAULT_SIGN_IN_URL = "/overview";
