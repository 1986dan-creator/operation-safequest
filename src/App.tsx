import { useEffect, useState } from "react";
import "./App.css";

import {
  avatars,
  heroChallenges,
  passwordChallenges,
  quizQuestions,
  ranks,
  safetyTips,
  scamMessages,
  shopItems,
} from "./gameData";

import { HomeScreen } from "./screens/HomeScreen";
import { HowToPlayScreen } from "./screens/HowToPlayScreen";
import { PlayerSetupScreen } from "./screens/PlayerSetupScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { ScamHunterScreen } from "./screens/ScamHunterScreen";
import { PasswordProtectorScreen } from "./screens/PasswordProtectorScreen";
import { HeroMissionScreen } from "./screens/HeroMissionScreen";
import { ArcadeLobby } from "./screens/ArcadeLobby";

type Screen =
  | "home"
  | "guide"
  | "setup"
  | "lobby"
  | "quiz"
  | "scam"
  | "password"
  | "hero"
  | "shop"
  | "results";

function loadSavedText(keys: string[], fallback = "") {
  for (const key of keys) {
    const savedValue = localStorage.getItem(key);

    if (savedValue) {
      return savedValue;
    }
  }

  return fallback;
}

function loadSavedNumber(keys: string[], fallback: number) {
  for (const key of keys) {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      const numberValue = Number(savedValue);

      if (!Number.isNaN(numberValue)) {
        return numberValue;
      }
    }
  }

  return fallback;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const [playerName, setPlayerName] = useState(() =>
    loadSavedText(
      ["safequest-player-name", "playerName", "safequest-playerName"],
      ""
    )
  );

  const [selectedAvatar, setSelectedAvatar] = useState(() =>
    loadSavedText(
      ["safequest-player-avatar", "selectedAvatar", "avatar"],
      "🛡️"
    )
  );

  const [xp, setXp] = useState(() =>
    loadSavedNumber(["safequest-xp", "xp"], 450)
  );

  const [coins, setCoins] = useState(() =>
    loadSavedNumber(["safequest-coins", "coins"], 0)
  );

  const [quizCompletions, setQuizCompletions] = useState(() =>
    loadSavedNumber(["safequest-quiz-completions"], 0)
  );

  const [quizBestScore, setQuizBestScore] = useState(() =>
    loadSavedNumber(["safequest-quiz-best-score"], 0)
  );

  const [scamCompletions, setScamCompletions] = useState(() =>
    loadSavedNumber(["safequest-scam-completions"], 0)
  );

  const [passwordCompletions, setPasswordCompletions] = useState(() =>
    loadSavedNumber(["safequest-password-completions"], 0)
  );

  const [heroCompletions, setHeroCompletions] = useState(() =>
    loadSavedNumber(["safequest-hero-completions"], 0)
  );

  const [unlockedShopAvatars, setUnlockedShopAvatars] = useState<string[]>(
    () => {
      const savedAvatars = localStorage.getItem("safequest-shop-avatars");

      if (!savedAvatars) {
        return [];
      }

      try {
        const parsedAvatars = JSON.parse(savedAvatars);

        return Array.isArray(parsedAvatars) ? parsedAvatars : [];
      } catch {
        return [];
      }
    }
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
const [timeLeft, setTimeLeft] = useState(20);

useEffect(() => {
  if (screen !== "quiz" || hasAnswered) {
    return;
  }

  if (timeLeft === 0) {
    setHasAnswered(true);
    return;
  }

  const timer = window.setTimeout(() => {
    setTimeLeft((currentTime) => currentTime - 1);
  }, 1000);

  return () => window.clearTimeout(timer);
}, [screen, timeLeft, hasAnswered]);

  const [scamIndex, setScamIndex] = useState(0);
  const [scamScore, setScamScore] = useState(0);
  const [selectedScamChoice, setSelectedScamChoice] = useState<boolean | null>(
    null
  );
  const [hasScamAnswered, setHasScamAnswered] = useState(false);

  const [passwordIndex, setPasswordIndex] = useState(0);
  const [passwordScore, setPasswordScore] = useState(0);
  const [selectedPasswordChoice, setSelectedPasswordChoice] = useState<
    boolean | null
  >(null);
  const [hasPasswordAnswered, setHasPasswordAnswered] = useState(false);

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroScore, setHeroScore] = useState(0);
  const [selectedHeroAnswer, setSelectedHeroAnswer] = useState<number | null>(
    null
  );
  const [hasHeroAnswered, setHasHeroAnswered] = useState(false);

  const [completedMission, setCompletedMission] = useState("");
  const [rewardXp, setRewardXp] = useState(0);
  const [rewardCoins, setRewardCoins] = useState(0);

const [safetyTip] = useState(
  () => safetyTips[Math.floor(Math.random() * safetyTips.length)]
);

const [showNewBestMessage, setShowNewBestMessage] = useState(false);

  const savePlayer = () => {
    const cleanName = playerName.trim();

    if (!cleanName) {
      alert("Please enter your name before continuing.");
      return;
    }

    localStorage.setItem("safequest-player-name", cleanName);
    localStorage.setItem("safequest-player-avatar", selectedAvatar);
    localStorage.setItem("safequest-xp", String(xp));
    localStorage.setItem("safequest-coins", String(coins));

    setPlayerName(cleanName);
    setScreen("lobby");
  };

  const startQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
setHasAnswered(false);
setTimeLeft(20);
setScreen("quiz");
  };

  const chooseAnswer = (answerIndex: number) => {
    if (hasAnswered) return;

    const currentQuestion = quizQuestions[questionIndex];

    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 50);
    }
  };

  const nextQuestion = () => {
    const currentQuestion = quizQuestions[questionIndex];
    const gotAnswerRight =
      selectedAnswer === currentQuestion.correctAnswer;

    if (questionIndex === quizQuestions.length - 1) {
      const earnedXp = score + (gotAnswerRight ? 50 : 0);
      const earnedCoins = 3;
      const newXp = xp + earnedXp;
      const newCoins = coins + earnedCoins;
      const newQuizCompletions = quizCompletions + 1;

const isNewBestScore = earnedXp > quizBestScore;
const newQuizBestScore = isNewBestScore
  ? earnedXp
  : quizBestScore;

      localStorage.setItem("safequest-xp", String(newXp));
      localStorage.setItem("safequest-coins", String(newCoins));
      localStorage.setItem(
        "safequest-quiz-completions",
        String(newQuizCompletions)
      );

localStorage.setItem(
  "safequest-quiz-best-score",
  String(newQuizBestScore)
);

      setXp(newXp);
      setCoins(newCoins);
      setQuizCompletions(newQuizCompletions);
setQuizBestScore(newQuizBestScore);
setShowNewBestMessage(isNewBestScore);
setCompletedMission("Quiz Rush");
      setRewardXp(earnedXp);
      setRewardCoins(earnedCoins);
      setQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setScreen("results");

      return;
    }

setQuestionIndex((currentIndex) => currentIndex + 1);
setSelectedAnswer(null);
setHasAnswered(false);
setTimeLeft(20);
  };

  const startScamHunter = () => {
    setScamIndex(0);
    setScamScore(0);
    setSelectedScamChoice(null);
    setHasScamAnswered(false);
    setScreen("scam");
  };

  const chooseScamAnswer = (playerSaysScam: boolean) => {
    if (hasScamAnswered) return;

    const currentMessage = scamMessages[scamIndex];

    setSelectedScamChoice(playerSaysScam);
    setHasScamAnswered(true);

    if (playerSaysScam === currentMessage.isScam) {
      setScamScore((currentScore) => currentScore + 75);
    }
  };

  const nextScamMessage = () => {
    const currentMessage = scamMessages[scamIndex];
    const gotAnswerRight =
      selectedScamChoice === currentMessage.isScam;

    if (scamIndex === scamMessages.length - 1) {
      const earnedXp = scamScore + (gotAnswerRight ? 75 : 0);
      const earnedCoins = 5;
      const newXp = xp + earnedXp;
      const newCoins = coins + earnedCoins;
      const newScamCompletions = scamCompletions + 1;

      localStorage.setItem("safequest-xp", String(newXp));
      localStorage.setItem("safequest-coins", String(newCoins));
      localStorage.setItem(
        "safequest-scam-completions",
        String(newScamCompletions)
      );

      setXp(newXp);
      setCoins(newCoins);
      setScamCompletions(newScamCompletions);
      setCompletedMission("Scam Hunter");
      setRewardXp(earnedXp);
      setRewardCoins(earnedCoins);
      setScamIndex(0);
      setScamScore(0);
      setSelectedScamChoice(null);
      setHasScamAnswered(false);
      setScreen("results");

      return;
    }

    setScamIndex((currentIndex) => currentIndex + 1);
    setSelectedScamChoice(null);
    setHasScamAnswered(false);
  };

  const startPasswordProtector = () => {
    setPasswordIndex(0);
    setPasswordScore(0);
    setSelectedPasswordChoice(null);
    setHasPasswordAnswered(false);
    setScreen("password");
  };

  const choosePasswordAnswer = (playerSaysStrong: boolean) => {
    if (hasPasswordAnswered) return;

    const currentChallenge = passwordChallenges[passwordIndex];

    setSelectedPasswordChoice(playerSaysStrong);
    setHasPasswordAnswered(true);

    if (playerSaysStrong === currentChallenge.isStrong) {
      setPasswordScore((currentScore) => currentScore + 100);
    }
  };

  const nextPasswordChallenge = () => {
    const currentChallenge = passwordChallenges[passwordIndex];
    const gotAnswerRight =
      selectedPasswordChoice === currentChallenge.isStrong;

    if (passwordIndex === passwordChallenges.length - 1) {
      const earnedXp = passwordScore + (gotAnswerRight ? 100 : 0);
      const earnedCoins = 7;
      const newXp = xp + earnedXp;
      const newCoins = coins + earnedCoins;
      const newPasswordCompletions = passwordCompletions + 1;

      localStorage.setItem("safequest-xp", String(newXp));
      localStorage.setItem("safequest-coins", String(newCoins));
      localStorage.setItem(
        "safequest-password-completions",
        String(newPasswordCompletions)
      );

      setXp(newXp);
      setCoins(newCoins);
      setPasswordCompletions(newPasswordCompletions);
      setCompletedMission("Password Protector");
      setRewardXp(earnedXp);
      setRewardCoins(earnedCoins);
      setPasswordIndex(0);
      setPasswordScore(0);
      setSelectedPasswordChoice(null);
      setHasPasswordAnswered(false);
      setScreen("results");

      return;
    }

    setPasswordIndex((currentIndex) => currentIndex + 1);
    setSelectedPasswordChoice(null);
    setHasPasswordAnswered(false);
  };

  const startHeroMission = () => {
    setHeroIndex(0);
    setHeroScore(0);
    setSelectedHeroAnswer(null);
    setHasHeroAnswered(false);
    setScreen("hero");
  };

const playAgain = () => {
  setShowNewBestMessage(false);

  if (completedMission === "Quiz Rush") {
    startQuiz();
    return;
  }

  if (completedMission === "Scam Hunter") {
    startScamHunter();
    return;
  }

  if (completedMission === "Password Protector") {
    startPasswordProtector();
    return;
  }

  if (completedMission === "Digital Defender") {
    startHeroMission();
    return;
  }

  setScreen("lobby");
};

  const chooseHeroAnswer = (answerIndex: number) => {
    if (hasHeroAnswered) return;

    const currentChallenge = heroChallenges[heroIndex];

    setSelectedHeroAnswer(answerIndex);
    setHasHeroAnswered(true);

    if (answerIndex === currentChallenge.correctAnswer) {
      setHeroScore((currentScore) => currentScore + 125);
    }
  };

  const nextHeroChallenge = () => {
    const currentChallenge = heroChallenges[heroIndex];
    const gotAnswerRight =
      selectedHeroAnswer === currentChallenge.correctAnswer;

    if (heroIndex === heroChallenges.length - 1) {
      const earnedXp = heroScore + (gotAnswerRight ? 125 : 0);
      const earnedCoins = 12;
      const newXp = xp + earnedXp;
      const newCoins = coins + earnedCoins;
      const newHeroCompletions = heroCompletions + 1;

      localStorage.setItem("safequest-xp", String(newXp));
      localStorage.setItem("safequest-coins", String(newCoins));
      localStorage.setItem(
        "safequest-hero-completions",
        String(newHeroCompletions)
      );

      setXp(newXp);
      setCoins(newCoins);
      setHeroCompletions(newHeroCompletions);
      setCompletedMission("Digital Defender");
      setRewardXp(earnedXp);
      setRewardCoins(earnedCoins);
      setHeroIndex(0);
      setHeroScore(0);
      setSelectedHeroAnswer(null);
      setHasHeroAnswered(false);
      setScreen("results");

      return;
    }

    setHeroIndex((currentIndex) => currentIndex + 1);
    setSelectedHeroAnswer(null);
    setHasHeroAnswered(false);
  };

  const startShop = () => {
    setScreen("shop");
  };

  const buyAvatar = (avatar: string, cost: number, name: string) => {
    const alreadyUnlocked = unlockedShopAvatars.includes(avatar);

    if (alreadyUnlocked) {
      setSelectedAvatar(avatar);
      localStorage.setItem("safequest-player-avatar", avatar);
      setScreen("lobby");
      return;
    }

    if (coins < cost) {
      alert(`You need ${cost} coins to unlock ${name}.`);
      return;
    }

    const newCoins = coins - cost;
    const newUnlockedAvatars = [...unlockedShopAvatars, avatar];

    localStorage.setItem("safequest-coins", String(newCoins));
    localStorage.setItem(
      "safequest-shop-avatars",
      JSON.stringify(newUnlockedAvatars)
    );
    localStorage.setItem("safequest-player-avatar", avatar);

    setCoins(newCoins);
    setUnlockedShopAvatars(newUnlockedAvatars);
    setSelectedAvatar(avatar);
    setScreen("lobby");
  };

  const resetProgress = () => {
    const confirmed = window.confirm(
      "Reset all SafeQuest progress? This cannot be undone."
    );

    if (!confirmed) return;

    const storageKeys = [
      "safequest-player-name",
      "playerName",
      "safequest-playerName",
      "safequest-player-avatar",
      "selectedAvatar",
      "avatar",
      "safequest-xp",
      "xp",
      "safequest-coins",
      "coins",
"safequest-quiz-completions",
"safequest-quiz-best-score",
"safequest-scam-completions",
      "safequest-password-completions",
      "safequest-hero-completions",
      "safequest-shop-avatars",
    ];

    storageKeys.forEach((key) => localStorage.removeItem(key));

    setPlayerName("");
    setSelectedAvatar("🛡️");
    setXp(450);
    setCoins(0);
setQuizCompletions(0);
setQuizBestScore(0);
setScamCompletions(0);
    setPasswordCompletions(0);
    setHeroCompletions(0);
    setUnlockedShopAvatars([]);
    setCompletedMission("");
    setRewardXp(0);
setRewardCoins(0);
setShowNewBestMessage(false);
setScreen("setup");
  };

  const availableAvatars = [...avatars, ...unlockedShopAvatars];

  if (screen === "home") {
    return (
      <HomeScreen
        hasPlayer={Boolean(playerName)}
        onStart={() => setScreen(playerName ? "lobby" : "setup")}
        onOpenGuide={() => setScreen("guide")}
      />
    );
  }

  if (screen === "guide") {
    return <HowToPlayScreen onBack={() => setScreen("home")} />;
  }

  if (screen === "setup") {
    return (
      <PlayerSetupScreen
        playerName={playerName}
        selectedAvatar={selectedAvatar}
        availableAvatars={availableAvatars}
        isEditing={Boolean(playerName)}
        onNameChange={(name) => setPlayerName(name)}
        onAvatarChange={(avatar) => setSelectedAvatar(avatar)}
        onSave={savePlayer}
      />
    );
  }

  if (screen === "shop") {
    return (
      <ShopScreen
        coins={coins}
        items={shopItems}
        unlockedAvatars={unlockedShopAvatars}
        onBuy={buyAvatar}
        onBack={() => setScreen("lobby")}
      />
    );
  }

  if (screen === "results") {
    return (
<ResultsScreen
  completedMission={completedMission}
  rewardXp={rewardXp}
rewardCoins={rewardCoins}
correctAnswers={
  completedMission === "Quiz Rush" ? rewardXp / 50 : undefined
}
totalQuestions={
  completedMission === "Quiz Rush" ? quizQuestions.length : undefined
}
showNewBestMessage={showNewBestMessage}
onPlayAgain={playAgain}
onReturnToLobby={() => {
    setShowNewBestMessage(false);
    setScreen("lobby");
  }}
/>
    );
  }

  if (screen === "hero") {
    return (
      <HeroMissionScreen
        challenge={heroChallenges[heroIndex]}
        challengeNumber={heroIndex + 1}
        totalChallenges={heroChallenges.length}
        score={heroScore}
        selectedAnswer={selectedHeroAnswer}
        hasAnswered={hasHeroAnswered}
        onChooseAnswer={chooseHeroAnswer}
        onNext={nextHeroChallenge}
      />
    );
  }

  if (screen === "password") {
    return (
      <PasswordProtectorScreen
        challenge={passwordChallenges[passwordIndex]}
        challengeNumber={passwordIndex + 1}
        totalChallenges={passwordChallenges.length}
        score={passwordScore}
        selectedChoice={selectedPasswordChoice}
        hasAnswered={hasPasswordAnswered}
        onChooseAnswer={choosePasswordAnswer}
        onNext={nextPasswordChallenge}
      />
    );
  }

  if (screen === "scam") {
    return (
      <ScamHunterScreen
        message={scamMessages[scamIndex]}
        messageNumber={scamIndex + 1}
        totalMessages={scamMessages.length}
        score={scamScore}
        selectedChoice={selectedScamChoice}
        hasAnswered={hasScamAnswered}
        onChooseAnswer={chooseScamAnswer}
        onNext={nextScamMessage}
      />
    );
  }

  if (screen === "quiz") {
    return (
      <QuizScreen
        question={quizQuestions[questionIndex]}
        questionNumber={questionIndex + 1}
        totalQuestions={quizQuestions.length}
score={score}
timeLeft={timeLeft}
timeUp={timeLeft === 0}
selectedAnswer={selectedAnswer}
        hasAnswered={hasAnswered}
        onChooseAnswer={chooseAnswer}
        onNext={nextQuestion}
      />
    );
  }

  let currentRankIndex = 0;

  if (xp >= 2000) {
    currentRankIndex = 3;
  } else if (xp >= 1000) {
    currentRankIndex = 2;
  } else if (xp >= 500) {
    currentRankIndex = 1;
  }

  const currentRank = ranks[currentRankIndex];
  const nextRank = ranks[currentRankIndex + 1];

  const xpProgress = nextRank
    ? Math.min(
        ((xp - currentRank.minXp) /
          (nextRank.minXp - currentRank.minXp)) *
          100,
        100
      )
    : 100;

  const scamHunterUnlocked = xp >= 500;
  const passwordProtectorUnlocked = xp >= 1000;
  const heroMissionUnlocked = xp >= 2000;

  const totalMissions =
    quizCompletions +
    scamCompletions +
    passwordCompletions +
    heroCompletions;

  const achievements = [
    {
      icon: "🎖️",
      title: "Cadet",
      description: "Reach 500 XP",
      unlocked: xp >= ranks[1].minXp,
    },
    {
      icon: "⚡",
      title: "Quiz Master",
      description: "Complete Quiz Rush",
      unlocked: quizCompletions >= 1,
    },
    {
      icon: "🕵️",
      title: "Scam Spotter",
      description: "Complete Scam Hunter",
      unlocked: scamCompletions >= 1,
    },
    {
      icon: "🔐",
      title: "Password Protector",
      description: "Complete Password Protector",
      unlocked: passwordCompletions >= 1,
    },
    {
      icon: "🏆",
      title: "Digital Defender",
      description: "Complete the Hero Mission",
      unlocked: heroCompletions >= 1,
    },
  ];

  return (
    <ArcadeLobby
      playerName={playerName}
      selectedAvatar={selectedAvatar}
      currentRank={currentRank}
      nextRank={nextRank}
      ranks={ranks}
xp={xp}
coins={coins}
safetyTip={safetyTip}
xpProgress={xpProgress}
      totalMissions={totalMissions}
quizBestScore={quizBestScore}
achievements={achievements}
      scamHunterUnlocked={scamHunterUnlocked}
      passwordProtectorUnlocked={passwordProtectorUnlocked}
      heroMissionUnlocked={heroMissionUnlocked}
      onEditProfile={() => setScreen("setup")}
      onOpenShop={startShop}
      onReset={resetProgress}
      onStartQuiz={startQuiz}
      onStartScamHunter={startScamHunter}
      onStartPasswordProtector={startPasswordProtector}
      onStartHeroMission={startHeroMission}
    />
  );
}

export default App;
