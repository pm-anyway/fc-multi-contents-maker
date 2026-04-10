import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 배경 그라디언트 페이드인
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 태그라인 슬라이드업
  const tagSpring = spring({ fps, frame, from: 40, to: 0, durationInFrames: 25 });
  const tagOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  // 메인 타이틀 슬라이드업 (딜레이)
  const titleSpring = spring({ fps, frame: frame - 12, from: 60, to: 0, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [12, 30], [0, 1], { extrapolateRight: "clamp" });

  // 서브타이틀
  const subSpring = spring({ fps, frame: frame - 25, from: 30, to: 0, durationInFrames: 25 });
  const subOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp" });

  // 하단 바 스케일
  const barScale = spring({ fps, frame: frame - 35, from: 0, to: 1, durationInFrames: 20 });

  return (
    <AbsoluteFill
      style={{
        opacity: bgOpacity,
        background: "linear-gradient(160deg, #0d0d0d 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      {/* 배경 장식 원 */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67,97,238,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,247,0.12) 0%, transparent 70%)",
        }}
      />

      {/* 태그라인 */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagSpring}px)`,
          background: "rgba(67,97,238,0.2)",
          border: "1px solid rgba(67,97,238,0.5)",
          borderRadius: 100,
          padding: "12px 32px",
          marginBottom: 48,
        }}
      >
        <span
          style={{
            color: "#7b9cff",
            fontSize: 32,
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          스탠포드 AI 강의
        </span>
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleSpring}px)`,
          color: "#ffffff",
          fontSize: 88,
          fontWeight: 800,
          fontFamily: "sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
          margin: 0,
          marginBottom: 36,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        AI 잠재력의{"\n"}
        <span style={{ color: "#4361ee" }}>90%</span>를{"\n"}
        못 쓰는 이유
      </h1>

      {/* 서브타이틀 */}
      <p
        style={{
          opacity: subOpacity,
          transform: `translateY(${subSpring}px)`,
          color: "rgba(255,255,255,0.6)",
          fontSize: 40,
          fontFamily: "sans-serif",
          textAlign: "center",
          margin: 0,
          marginBottom: 80,
          lineHeight: 1.5,
        }}
      >
        제레미 어틀리 교수가 말하는{"\n"}AI 고수와 하수의 차이
      </p>

      {/* 하단 강조 바 */}
      <div
        style={{
          width: 120 * barScale,
          height: 6,
          background: "linear-gradient(90deg, #4361ee, #7b2ff7)",
          borderRadius: 3,
        }}
      />
    </AbsoluteFill>
  );
};
