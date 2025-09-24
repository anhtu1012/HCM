"use client";

import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GiAntiAircraftGun } from "react-icons/gi";
import { IoArrowBackCircle } from "react-icons/io5";
import { GameArena, QuizModal, WinModal } from "./components";
import {
  animateShot,
  calculateBarrelTip,
  calculateVelocity,
} from "./gameLogic";
import "./index.scss";
// Types
interface QuestionOption {
  key: string;
  text: string;
}

interface Question {
  q: string;
  options: QuestionOption[];
  correct: string;
}

interface GameState {
  tankX: number;
  angle: number;
  power: number;
  isFlying: boolean;
  quizLocked: boolean;
  shots: number;
  correct: number;
  wrong: number;
  castleHp: number;
  lives: number;
  castleX: number;
  castleY: number;
}

interface CastleBody {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Constants
// const GROUND_Y = 420;
// const TANK_Y = 388;
const TANK_MIN_X = 70;
const TANK_MAX_X = 500; // Increased range for more movement

const questionsSource: Question[] = [
  {
    q: "1) Độc lập dân tộc theo Hồ Chí Minh khác tiền nhân điểm nào?",
    options: [
      { key: "A", text: "Dựa hoàn toàn vào ngoại bang" },
      { key: "B", text: "Dựa vào sức mạnh nhân dân, gắn độc lập với CNXH" },
      { key: "C", text: "Chỉ cải cách xã hội trong nước" },
      { key: "D", text: "Tách biệt hoàn toàn với Thế giới" },
    ],
    correct: "B",
  },
  {
    q: "2) Nếu chỉ giành độc lập chính trị mà thiếu độc lập kinh tế – văn hóa, hậu quả sẽ là gì?",
    options: [
      { key: "A", text: "Đất nước nhanh chóng hùng mạnh" },
      { key: "B", text: "Độc lập không bền vững, dễ lệ thuộc trở lại" },
      { key: "C", text: "Nhân dân hoàn toàn hạnh phúc" },
      { key: "D", text: "Không thay đổi gì" },
    ],
    correct: "B",
  },
  {
    q: "3) Hồ Chí Minh đã tìm thấy con đường cứu nước đúng đắn từ đâu?",
    options: [
      { key: "A", text: "Chủ nghĩa Mác - Lênin" },
      { key: "B", text: "Văn minh phương Tây" },
    ],
    correct: "A",
  },
  {
    q: "4) Trong thời toàn cầu hóa, độc lập dân tộc nên được hiểu như thế nào?",
    options: [
      { key: "A", text: "Không hợp tác với bất kì quốc gia nào" },
      { key: "B", text: "Chỉ làm theo nước lớn" },
      { key: "C", text: "Chỉ tập trung vào nội lục, bỏ qua quốc tế" },
      { key: "D", text: "Tự quyết, không lệ thuộc, nhưng vẫn hội nhập" },
    ],
    correct: "D",
  },
  {
    q: "5) Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với:",
    options: [
      { key: "A", text: "Chủ nghĩa xã hội" },
      { key: "B", text: "Chủ nghĩa dân tộc thuần túy" },
      { key: "C", text: "Lệ thuộc vào cường quốc" },
    ],
    correct: "A",
  },
  {
    q: "6) Lực lượng nòng cốt trong cách mạng giải phóng dân tộc theo Hồ Chí Minh là:",
    options: [
      { key: "A", text: "Trí thức" },
      { key: "B", text: "Công - nông" },
    ],
    correct: "B",
  },
  {
    q: "7) Độc lập dân tộc chỉ cần thoát khỏi sự cai trị chính trị.",
    options: [
      { key: "A", text: "Đúng" },
      { key: "B", text: "Sai" },
    ],
    correct: "B",
  },
  {
    q: "8) Người trẻ hôm nay có thể làm gì để góp phần giữ vững độc lập dân tộc?",
    options: [
      { key: "A", text: "Học tập, làm chủ công nghệ, giữ gìn văn hóa" },
      { key: "B", text: "Phụ thuộc vào sản phẩm ngoại nhập" },
      { key: "C", text: "Phụ thuộc sản phẩm nội địa" },
    ],
    correct: "A",
  },
];

// Fireworks celebration function
const triggerFireworks = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Multiple bursts from different positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ["#fbbf24", "#34d399", "#60a5fa", "#f87171", "#a78bfa"],
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ["#fbbf24", "#34d399", "#60a5fa", "#f87171", "#a78bfa"],
    });
  }, 250);
};

const TankGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    tankX: 110,
    angle: 45,
    power: 60,
    isFlying: false,
    quizLocked: false,
    shots: 0,
    correct: 0,
    wrong: 0,
    castleHp: 100,
    lives: 3,
    castleX: 740,
    castleY: 300,
  });

  // Modal states
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "correct" | "incorrect";
  } | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  // Questions pool
  const [questions, setQuestions] = useState<Question[]>([]);

  // Refs
  const projectileRef = useRef<SVGCircleElement>(null);
  const fxRef = useRef<SVGGElement>(null);
  const castleRef = useRef<SVGGElement>(null);
  const barrelRef = useRef<SVGGElement>(null);

  const router = useRouter();

  // Phico image body for collision detection
  const castleBody: CastleBody = {
    x: gameState.castleX - 75,
    y: gameState.castleY - 60,
    w: 150,
    h: 120,
  };

  // Utility functions
  const shuffle = useCallback((arr: Question[]): Question[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }, []);

  // Initialize questions on mount
  useEffect(() => {
    setQuestions(shuffle(questionsSource));
  }, [shuffle]);

  // Game control handlers
  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const angle = parseInt(e.target.value, 10);
    setGameState((prev) => ({ ...prev, angle }));
  };

  const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const power = parseInt(e.target.value, 10);
    setGameState((prev) => ({ ...prev, power }));
  };

  const moveLeft = () => {
    if (gameState.isFlying || gameState.quizLocked) return;
    setGameState((prev) => ({
      ...prev,
      tankX: Math.max(TANK_MIN_X, prev.tankX - 16),
    }));
  };

  const moveRight = () => {
    if (gameState.isFlying || gameState.quizLocked) return;
    setGameState((prev) => ({
      ...prev,
      tankX: Math.min(TANK_MAX_X, prev.tankX + 16),
    }));
  };

  // Effects
  const spawnBoom = useCallback((x: number, y: number) => {
    if (!fxRef.current) return;

    const boom = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    boom.setAttribute("cx", x.toString());
    boom.setAttribute("cy", y.toString());
    boom.setAttribute("r", "2");
    boom.setAttribute("fill", "#fbbf24");
    boom.setAttribute("class", "boom");
    fxRef.current.appendChild(boom);

    setTimeout(() => boom.remove(), 700);
  }, []);

  const spawnPuff = useCallback((x: number, y: number) => {
    if (!fxRef.current) return;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${x}, ${y})`);
    g.setAttribute("class", "puff");

    const c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c1.setAttribute("cx", "0");
    c1.setAttribute("cy", "0");
    c1.setAttribute("r", "8");
    c1.setAttribute("fill", "#fca5a5");

    const c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c2.setAttribute("cx", "-8");
    c2.setAttribute("cy", "-2");
    c2.setAttribute("r", "6");
    c2.setAttribute("fill", "#fecaca");

    const c3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c3.setAttribute("cx", "7");
    c3.setAttribute("cy", "-3");
    c3.setAttribute("r", "5");
    c3.setAttribute("fill", "#fde68a");

    g.appendChild(c1);
    g.appendChild(c2);
    g.appendChild(c3);
    fxRef.current.appendChild(g);

    setTimeout(() => g.remove(), 850);
  }, []);

  // Collision detection
  const hitCastle = useCallback(
    (x: number, y: number): boolean => {
      return (
        x >= castleBody.x &&
        x <= castleBody.x + castleBody.w &&
        y >= castleBody.y &&
        y <= castleBody.y + castleBody.h
      );
    },
    [castleBody]
  );

  const endShot = useCallback((hit: boolean) => {
    setGameState((prev) => ({ ...prev, isFlying: false }));

    // Hide projectile
    setTimeout(() => {
      if (projectileRef.current) {
        projectileRef.current.setAttribute("opacity", "0");
        projectileRef.current.setAttribute("cx", "-20");
        projectileRef.current.setAttribute("cy", "-20");
      }
    }, 20);

    if (hit) {
      // Shake castle
      if (castleRef.current) {
        castleRef.current.classList.add("wiggle");
        setTimeout(() => castleRef.current?.classList.remove("wiggle"), 400);
      }
      openQuiz();
    }
  }, []);

  // Fire projectile
  const fire = () => {
    if (gameState.isFlying || gameState.quizLocked) return;
    if (gameState.lives <= 0) {
      setCurrentQuestion({
        q: "Bạn đã hết tim. Nhấn 'Chơi lại' để bắt đầu ván mới!",
        options: [],
        correct: "",
      });
      setShowQuizModal(true);
      setShowCloseBtn(true);
      return;
    }

    setGameState((prev) => ({ ...prev, shots: prev.shots + 1 }));

    const startPos = calculateBarrelTip(gameState.tankX, gameState.angle);
    const velocity = calculateVelocity(gameState.angle, gameState.power);

    animateShot(
      startPos.x,
      startPos.y,
      velocity.vx,
      velocity.vy,
      projectileRef,
      hitCastle,
      spawnBoom,
      spawnPuff,
      endShot,
      (isFlying) => setGameState((prev) => ({ ...prev, isFlying }))
    );
  };

  // Quiz functions
  const openQuiz = () => {
    let currentQuestions = questions;
    if (currentQuestions.length === 0) {
      currentQuestions = shuffle(questionsSource);
      setQuestions(currentQuestions);
    }

    const nextQuestion = currentQuestions[0] || questionsSource[0];
    setCurrentQuestion(nextQuestion);
    setQuestions((prev) => prev.slice(1));

    setGameState((prev) => ({ ...prev, quizLocked: true }));
    setShowQuizModal(true);
    setShowFeedback(false);
    setShowNextBtn(false);
    setShowCloseBtn(false);
    setFeedback(null);
  };

  const closeQuiz = () => {
    setGameState((prev) => ({ ...prev, quizLocked: false }));
    setShowQuizModal(false);
  };

  const checkAnswer = (choice: string) => {
    if (!currentQuestion) return;

    const isCorrect = choice === currentQuestion.correct;

    if (isCorrect) {
      const newHp = Math.max(0, gameState.castleHp - 20);

      setGameState((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        castleHp: newHp,
      }));

      // Move aircraft to new position
      const minX = 560,
        maxX = 820;
      const newX = Math.floor(minX + Math.random() * (maxX - minX));
      setGameState((prev) => ({ ...prev, castleX: newX }));

      // Show feedback briefly then close
      setFeedback({
        message: "Chính xác! Máy bay đã chịu sát thương.",
        type: "correct",
      });
      setShowFeedback(true);

      // Check if aircraft is destroyed
      if (newHp <= 0) {
        // Trigger fireworks and show win modal
        setTimeout(() => {
          closeQuiz();
          triggerFireworks();
          setShowWinModal(true);
        }, 1500);
      } else {
        // Close quiz after showing feedback
        setTimeout(() => {
          closeQuiz();
        }, 1500);
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        wrong: prev.wrong + 1,
        lives: Math.max(0, prev.lives - 1),
      }));

      setFeedback({
        message:
          gameState.lives > 1
            ? "Chưa đúng rồi. Bạn bị mất 1 tim. Cố lên!"
            : "Bạn đã hết tim! Hãy chơi lại để tiếp tục.",
        type: "incorrect",
      });

      setShowFeedback(true);

      // Check lose condition and close quiz
      if (gameState.lives <= 1) {
        // Game over - show close button
        setShowCloseBtn(true);
      } else {
        // Close quiz after showing feedback
        setTimeout(() => {
          closeQuiz();
        }, 2000);
      }
    }
  };

  const handleNext = () => {
    closeQuiz();
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      tankX: 110,
      angle: 45,
      power: 60,
      isFlying: false,
      quizLocked: false,
      shots: 0,
      correct: 0,
      wrong: 0,
      castleHp: 100,
      lives: 3,
      castleX: 740,
      castleY: 300,
    });

    setQuestions(shuffle(questionsSource));
    setShowQuizModal(false);
    setShowWinModal(false);

    if (projectileRef.current) {
      projectileRef.current.setAttribute("opacity", "0");
      projectileRef.current.setAttribute("cx", "-20");
      projectileRef.current.setAttribute("cy", "-20");
    }
  };

  // Update barrel rotation
  useEffect(() => {
    if (barrelRef.current) {
      barrelRef.current.setAttribute(
        "transform",
        `rotate(${-gameState.angle})`
      );
    }
  }, [gameState.angle]);

  // Update castle position
  useEffect(() => {
    if (castleRef.current) {
      castleRef.current.setAttribute(
        "transform",
        `translate(${gameState.castleX}, ${gameState.castleY})`
      );
    }
  }, [gameState.castleX, gameState.castleY]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.quizLocked) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case " ":
          e.preventDefault();
          fire();
          break;
        case "ArrowUp":
          e.preventDefault();
          setGameState((prev) => ({
            ...prev,
            angle: Math.min(80, prev.angle + 2),
          }));
          break;
        case "ArrowDown":
          e.preventDefault();
          setGameState((prev) => ({
            ...prev,
            angle: Math.max(10, prev.angle - 2),
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.quizLocked, gameState.angle]);

  // HP bar color
  const getHpBarClass = () => {
    if (gameState.castleHp > 60) return "high";
    if (gameState.castleHp > 30) return "medium";
    return "low";
  };

  return (
    <div className="tank-game">
      <IoArrowBackCircle
        onClick={() => router.push("/")}
        size={40}
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          zIndex: 10,
          cursor: "pointer",
        }}
      />
      <div className="container">
        {/* Header */}
        <header className="header">
          <div>
            <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
              Xe Tăng Bắn Máy Bay – Trắc nghiệm Hồ Chí Minh
            </h1>
            <p>
              Bắn trúng máy bay chiến đấu để mở câu hỏi. Trả lời đúng hoặc sai
              rồi bắn tiếp! Hạ gục máy bay để chiến thắng.
            </p>
          </div>
          <div className="goal-badge">
            <div className="badge">Mục tiêu: Hạ máy bay bằng kiến thức</div>
          </div>
        </header>

        {/* Dashboard */}
        <section className="dashboard">
          {/* Control Panel */}
          <div className="control-panel">
            <h2>Điều khiển xe tăng</h2>
            <div className="controls-grid">
              <div className="control-group span-2">
                <label>
                  Góc bắn: <span className="value">{gameState.angle}°</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={gameState.angle}
                  onChange={handleAngleChange}
                />
              </div>
              <div className="control-group span-2">
                <label>
                  Lực bắn: <span className="value">{gameState.power}%</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={gameState.power}
                  onChange={handlePowerChange}
                  className="power-slider"
                />
              </div>
              <div className="button-group">
                <button
                  onClick={moveLeft}
                  disabled={gameState.isFlying || gameState.quizLocked}
                >
                  <span aria-hidden>⬅️</span>
                  <span>Trái</span>
                </button>
                <button
                  onClick={moveRight}
                  disabled={gameState.isFlying || gameState.quizLocked}
                >
                  <span>Phải</span>
                  <span aria-hidden>➡️</span>
                </button>
              </div>
              <div className="button-group">
                <button
                  className="fire-btn"
                  onClick={fire}
                  disabled={gameState.isFlying || gameState.quizLocked}
                >
                  {" "}
                  <span>Bắn</span>
                  <span aria-hidden>
                    {" "}
                    <GiAntiAircraftGun size={20} />
                  </span>
                </button>
                <button onClick={resetGame}>
                  <span aria-hidden>↻</span>
                  <span>Chơi lại</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Panel */}
          <div className="status-panel">
            <h2>Trạng thái trận đấu</h2>
            <div className="status-content">
              <div className="hp-section">
                <div className="hp-header">
                  <span>Máu máy bay</span>
                  <span>{gameState.castleHp}%</span>
                </div>
                <div className="hp-bar">
                  <div
                    className={`hp-fill ${getHpBarClass()}`}
                    style={{ width: `${gameState.castleHp}%` }}
                  />
                </div>
              </div>
              <div className="lives-section">
                <div className="lives-header">
                  <span>Máu của bạn</span>
                  <span>{gameState.lives}/3</span>
                </div>
                <div className="hearts">
                  {Array.from({ length: 3 }, (_, i) => (
                    <span key={i}>{i < gameState.lives ? "❤️" : "🖤"}</span>
                  ))}
                </div>
              </div>
              <div className="stats">
                <span>
                  Đã bắn: <b>{gameState.shots}</b>
                </span>
                <span>
                  Đúng: <b>{gameState.correct}</b>
                </span>
                <span>
                  Sai: <b>{gameState.wrong}</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Game Arena */}
        <GameArena
          gameState={gameState}
          projectileRef={projectileRef}
          fxRef={fxRef}
          castleRef={castleRef}
          barrelRef={barrelRef}
        />
      </div>

      {/* Quiz Modal */}
      <QuizModal
        show={showQuizModal}
        currentQuestion={currentQuestion}
        feedback={feedback}
        showFeedback={showFeedback}
        showNextBtn={showNextBtn}
        showCloseBtn={showCloseBtn}
        onClose={closeQuiz}
        onAnswer={checkAnswer}
        onNext={handleNext}
      />

      {/* Win Modal */}
      <WinModal
        show={showWinModal}
        gameState={gameState}
        onClose={() => setShowWinModal(false)}
        onPlayAgain={resetGame}
      />
    </div>
  );
};

export default TankGame;
