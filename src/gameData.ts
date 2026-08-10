export const avatars = ["👮", "🕵️", "🦸", "🛡️"];

export const shopItems = [
  { avatar: "🥷", name: "Cyber Ninja", cost: 10 },
  { avatar: "🤖", name: "Safety Bot", cost: 20 },
  { avatar: "🧙", name: "Cyber Wizard", cost: 35 },
];

export const ranks = [
  { name: "Recruit", icon: "🛡️", minXp: 0 },
  { name: "Cadet", icon: "🎖️", minXp: 500 },
  { name: "Guardian", icon: "🧭", minXp: 1000 },
  { name: "SafeQuest Hero", icon: "🏆", minXp: 2000 },
];

export const quizQuestions = [
  {
    question:
      "A stranger sends you a link and asks for your password. What should you do?",
    answers: [
      "Send the password",
      "Click the link",
      "Tell a trusted adult",
      "Reply with your address",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which password is safest?",
    answers: ["123456", "password", "MyDog!Runs7Fast", "yourname"],
    correctAnswer: 2,
  },
  {
    question: "What is a scam?",
    answers: [
      "A fun online game",
      "A trick to steal information or money",
      "A school subject",
      "A type of avatar",
    ],
    correctAnswer: 1,
  },
];

export const scamMessages = [
  {
    sender: "PrizeWinner247",
    message:
      "Congratulations! You won a new phone. Send your password to claim it now!",
    isScam: true,
    explanation:
      "This is a scam. Real prizes do not ask for your password.",
  },
  {
    sender: "Mum",
    message:
      "I will pick you up after school at 3 pm. See you soon!",
    isScam: false,
    explanation:
      "This looks safe because it is an expected message from a trusted person.",
  },
  {
    sender: "Game Support",
    message:
      "Your account will be deleted today. Click this link immediately to save it!",
    isScam: true,
    explanation:
      "This is a scam. Urgent threats and suspicious links are warning signs.",
  },
];

export const passwordChallenges = [
  {
    password: "sunshine",
    isStrong: false,
    explanation: "Weak passwords use common words and are easy to guess.",
  },
  {
    password: "Mango!Tree82",
    isStrong: true,
    explanation:
      "Strong passwords use a mix of words, numbers, and symbols.",
  },
  {
    password: "123456789",
    isStrong: false,
    explanation:
      "Number patterns are very easy for scammers to guess.",
  },
];

export const heroChallenges = [
  {
    scenario:
      "A friend messages you: “I lost my account. Send me the one-time login code you just received!”",
    answers: [
      "Call or speak to your friend another way before doing anything.",
      "Send the code immediately to help them.",
    ],
    correctAnswer: 0,
    explanation:
      "One-time login codes should never be shared. The account may have been taken over.",
  },
  {
    scenario:
      "You receive an unexpected school document attachment from an unfamiliar email address.",
    answers: [
      "Open it quickly in case it is important.",
      "Check with your teacher or school through a trusted method first.",
    ],
    correctAnswer: 1,
    explanation:
      "Unexpected attachments can be dangerous. Verify the sender before opening them.",
  },
  {
    scenario:
      "You are using public Wi-Fi and want to buy something online with a bank card.",
    answers: [
      "Wait until you are using a trusted, secure connection.",
      "Enter the card details because public Wi-Fi is always safe.",
    ],
    correctAnswer: 0,
    explanation:
      "Public Wi-Fi can be risky. Avoid sharing sensitive information on an untrusted network.",
  },
];