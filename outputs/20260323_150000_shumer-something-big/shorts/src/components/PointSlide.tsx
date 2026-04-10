import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface PointSlideProps {
  number: string;
  title: string;
  body: string;
  accent: string;
  index: number;
  total: number;
}

export const PointSlide: React.FC<PointSlideProps> = ({
  number,
  title,
  body,
  accent,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 슬라이드 전체 슬라이드인 (왼쪽에서)
  const slideIn = spring({ fps, frame, from: -1080, to: 0, durationInFrames: 22, config: { stiffness: 120, damping: 18 } });
  const slideOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // 번호 뱃지 팝인
  const badgePop = spring({ fps, frame: frame - 8, from: 0, to: 1, durationInFrames: 18, config: { stiffness: 200, damping: 12 } });

  // 제목 페이드+슬라이드업
  const titleY = spring({ fps, frame: frame - 14, from: 30, to: 0, durationInFrames: 20 });
  const titleOpacity = interpolate(frame, [14, 28], [0, 1], { extrapolateRight: "clamp" });

  // 본문 페이드+슬라이드업 (딜레이)
  const bodyY = spring({ fps, frame: frame - 24, from: 25, to: 0, durationInFrames: 20 });
  const bodyOpacity = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: "clamp" });

  // 하단 프로그레스 바
  const progressWidth = ((index + 1) / total) * 100;

  return (
    <AbsoluteFill
      style={{
        opacity: slideOpacity,
        transform: `translateX(${slideIn}px)`,
        background: "linear-gradient(170deg, #0d0d0d 0%, #111118 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 80px",
      }}
    >
      {/* 액센트 컬러 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* 왼쪽 액센트 바 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          width: 8,
          height: "60%",
          background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
          borderRadius: "0 4px 4px 0",
        }}
      />

      {/* 번호 뱃지 */}
      <div
        style={{
          transform: `scale(${badgePop})`,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
          boxShadow: `0 0 40px ${accent}60`,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 42,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          {number}
        </span>
      </div>

      {/* 제목 */}
      <h2
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          color: "#ffffff",
          fontSize: 76,
          fontWeight: 800,
          fontFamily: "sans-serif",
          lineHeight: 1.2,
          margin: 0,
          marginBottom: 40,
          textShadow: `0 2px 20px ${accent}40`,
        }}
      >
        {title}
      </h2>

      {/* 구분선 */}
      <div
        style={{
          width: 60,
          height: 4,
          background: accent,
          borderRadius: 2,
          marginBottom: 36,
          opacity: titleOpacity,
        }}
      />

      {/* 본문 */}
      <p
        style={{
          opacity: bodyOpacity,
          transform: `translateY(${bodyY}px)`,
          color: "rgba(255,255,255,0.78)",
          fontSize: 50,
          fontFamily: "sans-serif",
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: "pre-line",
        }}
      >
        {body}
      </p>

      {/* 하단 프로그레스 바 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          right: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                background: i <= index ? accent : "rgba(255,255,255,0.15)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
