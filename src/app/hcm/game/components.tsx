import React from 'react';

export interface GameArenaProps {
  gameState: {
    tankX: number;
    angle: number;
    castleX: number;
    castleY: number;
  };
  projectileRef: React.RefObject<SVGCircleElement | null>;
  fxRef: React.RefObject<SVGGElement | null>;
  castleRef: React.RefObject<SVGGElement | null>;
  barrelRef: React.RefObject<SVGGElement | null>;
}

export const GameArena: React.FC<GameArenaProps> = ({
  gameState,
  projectileRef,
  fxRef,
  castleRef,
  barrelRef
}) => {
  const TANK_Y = 388;

  return (
    <section className="arena">
      <svg viewBox="0 0 900 480">
        {/* Background */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#14532d" stopOpacity="0.95"/>
          </linearGradient>
        </defs>
        
        <rect x="0" y="0" width="900" height="480" fill="url(#sky)"/>
        
        {/* Mountains */}
        <g opacity="0.25">
          <polygon points="0,320 140,220 280,340 420,240 560,330 700,250 900,340 900,480 0,480" fill="#ffffff"/>
        </g>
        
        {/* Ground */}
        <rect x="0" y="420" width="900" height="60" fill="url(#groundGrad)"/>
        <g opacity="0.5">
          <rect x="0" y="412" width="900" height="8" fill="#22c55e"/>
        </g>

        {/* Tank */}
        <g transform={`translate(${gameState.tankX}, ${TANK_Y})`}>
          {/* Body */}
          <rect x="-34" y="0" width="68" height="24" rx="5" fill="#b91c1c" stroke="#ef4444" strokeWidth="2" />
          {/* Star emblem (center of body) */}
          <polygon
            points="0,-8 2.35,-2.47 8,-2.47 3.09,0.95 4.7,6.5 0,3.5 -4.7,6.5 -3.09,0.95 -8,-2.47 -2.35,-2.47"
            transform="translate(0,12)"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="1"
          />
          {/* Wheels */}
          <g transform="translate(0,24)">
            <circle cx="-22" cy="8" r="8" fill="#991b1b"/>
            <circle cx="0" cy="8" r="8" fill="#991b1b"/>
            <circle cx="22" cy="8" r="8" fill="#991b1b"/>
          </g>
          {/* Turret */}
          <rect x="-14" y="-10" width="28" height="16" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5"/>
          {/* Barrel */}
          <g ref={barrelRef}>
            <rect x="0" y="-8" width="52" height="6" rx="3" fill="#ef4444" />
            <circle cx="52" cy="-5" r="3" fill="#ef4444"/>
          </g>
        </g>

        {/* Aircraft Image - Phico */}
        <g ref={castleRef} transform={`translate(${gameState.castleX}, ${gameState.castleY})`}>
          <image 
            x="-75" 
            y="-60" 
            width="150" 
            height="120" 
            href="/assets/image/phico.png"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* Projectile */}
        <circle ref={projectileRef} cx="-20" cy="-20" r="4" fill="#fbbf24" opacity="0"/>

        {/* Effects */}
        <g ref={fxRef}></g>
      </svg>
    </section>
  );
};

export interface QuizModalProps {
  show: boolean;
  currentQuestion: {
    q: string;
    options: Array<{ key: string; text: string }>;
  } | null;
  feedback: { message: string; type: 'correct' | 'incorrect' } | null;
  showFeedback: boolean;
  showNextBtn: boolean;
  showCloseBtn: boolean;
  onClose: () => void;
  onAnswer: (choice: string) => void;
  onNext: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  show,
  currentQuestion,
  feedback,
  showFeedback,
  showNextBtn,
  showCloseBtn,
  onClose,
  onAnswer,
  onNext
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal-content large">
        <div className="modal-header">
          <h3>Câu hỏi trắc nghiệm</h3>
        </div>
        <div className="modal-body">
          {currentQuestion && (
            <>
              <div className="question-text">{currentQuestion.q}</div>
              {currentQuestion.options.length > 0 && (
                <div className="options">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.key}
                      className="option-btn"
                      onClick={() => onAnswer(option.key)}
                      disabled={showFeedback}
                    >
                      <span className="option-key">{option.key}</span>
                      <span className="option-text">{option.text}</span>
                    </button>
                  ))}
                </div>
              )}
              {showFeedback && feedback && (
                <div className={`feedback ${feedback.type}`}>
                  {feedback.message}
                </div>
              )}
            </>
          )}
        </div>
        <div className="modal-footer">
          {showCloseBtn && (
            <button className="secondary" onClick={onClose}>
              Đóng
            </button>
          )}
          {showNextBtn && (
            <button className="primary" onClick={onNext}>
              Tiếp tục
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export interface WinModalProps {
  show: boolean;
  gameState: {
    shots: number;
    correct: number;
    wrong: number;
  };
  onClose: () => void;
  onPlayAgain: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  show,
  gameState,
  onClose,
  onPlayAgain
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header win-header">
          <h3>Bạn đã hạ gục máy bay! 🏆</h3>
        </div>
        <div className="modal-body">
          <p>Tuyệt vời! Kiến thức đã giúp bạn chiến thắng.</p>
          <div className="win-stats">
            <ul>
              <li>• Số lần bắn: <b>{gameState.shots}</b></li>
              <li>• Câu đúng: <b>{gameState.correct}</b></li>
              <li>• Câu sai: <b>{gameState.wrong}</b></li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="danger" onClick={onPlayAgain}>
            Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
};
