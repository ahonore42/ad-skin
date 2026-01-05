export default function LiquidBackground() {
  return (
    <>
      {/* Damask background div */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url(/images/damask.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
          animation: "damaskBreathe 24s ease-in-out infinite",
          zIndex: -3,
        }}
      />

      {/* Base gradient div */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(5, 5, 5, 0.75) 0%, rgba(0, 0, 0, 0.95) 100%)",
          zIndex: -2,
        }}
      />

      {/* Liquid breathing layer with CSS blur */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter: "blur(60px)",
          animation: "opacityShift 16s ease-in-out infinite",
          zIndex: -1,
        }}
      >
        {/* Diagonal pattern 1 - larger scale */}
        <div
          style={{
            position: "absolute",
            inset: "-50%",
            background:
              "repeating-linear-gradient(45deg, rgba(28, 26, 32, 0.6) 0px, rgba(28, 26, 32, 0.45) 60px, rgba(24, 22, 28, 0.25) 120px, transparent 180px, rgba(20, 18, 24, 0.25) 300px, rgba(20, 18, 24, 0.45) 420px, rgba(28, 26, 32, 0.6) 480px)",
            animation: "liquidBreathing 20s ease-in-out infinite",
          }}
        />

        {/* Diagonal pattern 2 - different scale */}
        <div
          style={{
            position: "absolute",
            inset: "-50%",
            background:
              "repeating-linear-gradient(-45deg, rgba(20, 18, 24, 0.55) 0px, rgba(20, 18, 24, 0.4) 70px, rgba(24, 22, 28, 0.2) 140px, transparent 200px, rgba(24, 22, 28, 0.2) 320px, rgba(20, 18, 24, 0.4) 450px, rgba(20, 18, 24, 0.55) 520px)",
            animation: "liquidBreathing 18s ease-in-out infinite",
          }}
        />

        {/* Radial pattern - larger with offset center */}
        <div
          style={{
            position: "absolute",
            inset: "-50%",
            background:
              "repeating-radial-gradient(circle at 45% 55%, rgba(24, 22, 28, 0.6) 0px, rgba(24, 22, 28, 0.4) 80px, rgba(26, 24, 30, 0.25) 160px, transparent 240px, rgba(28, 26, 32, 0.2) 400px, rgba(28, 26, 32, 0.4) 520px, rgba(24, 22, 28, 0.6) 600px)",
            animation: "liquidBreathing 22s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}
