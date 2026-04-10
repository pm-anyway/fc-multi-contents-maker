import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 배경 페이드인
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // 메인 문구 팝인
  const mainPop = spring({ fps, frame: frame - 5, from: 0.6, to: 1, durationInFrames: 22, config: { stiffness: 150, damping: 14 } });
  const mainOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  // 서브 문구 슬라이드업
  const subY = spring({ fps, frame: frame - 20, from: 30, to: 0, durationInFrames: 20 });
  const subOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  // 출처 태그 슬라이드업
  const sourceY = spring({ fps, frame: frame - 35, from: 20, to: 0, durationInFrames: 18 });
  const sourceOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  // 링 애니메이션
  const ringScale = spring({ fps, frame: frame - 10, from: 0.7, to: 1, durationInFrames: 30, config: { stiffness: 80, damping: 14 } });
  const ringOpacity = interpolate(frame, [10, 30], [0, 0.25], { extrapolateRight: "clamp" });

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
      {/* 배경 링 장식 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `2px solid rgba(67,97,238,${ringOpacity})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ringScale * 0.75})`,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `2px solid rgba(123,47,247,${ringOpacity * 0.7})`,
          pointerEvents: "none",
        }}
      />

      {/* 메인 카피 */}
      <div
        style={{
          opacity: mainOpacity,
          transform: `scale(${mainPop})`,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 38,
            fontFamily: "sans-serif",
            fontWeight: 500,
            margin: 0,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          AI를 '사용'한다는 말의 유일한 정답
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "sans-serif",
            lineHeight: 1.25,
            margin: 0,
            textShadow: "0 4px 30px rgba(67,97,238,0.4)",
          }}
        >
          "나는 AI를 사용하지 않는다.{"\n"}
          <span style={{ color: "#4361ee" }}>AI와 함께 일한다.</span>"
        </h2>
      </div>

      {/* 구분선 */}
      <div
        style={{
          opacity: subOpacity,
          width: 80,
          height: 4,
          background: "linear-gradient(90deg, #4361ee, #7b2ff7)",
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      {/* 서브 문구 */}
      <p
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          color: "rgba(255,255,255,0.6)",
          fontSize: 42,
          fontFamily: "sans-serif",
          textAlign: "center",
          margin: 0,
          marginBottom: 80,
          lineHeight: 1.6,
        }}
      >
        — 제레미 어틀리, 스탠포드 교수
      </p>

      {/* 출처 태그 */}
      <div
        style={{
          opacity: sourceOpacity,
          transform: `translateY(${sourceY}px)`,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 100,
          padding: "14px 36px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#4361ee",
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 30,
            fontFamily: "sans-serif",
          }}
        >
          출처: EO Korea · 스탠포드 D스쿨
        </span>
      </div>
    </AbsoluteFill>
  );
};
