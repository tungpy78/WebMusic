import React, { useState, useEffect } from "react";

interface OTPCountdownProps {
  expireSeconds: number;
  onExpire?: () => void; // callback khi countdown hết
}

export default function OTPCountdown({
  expireSeconds,
  onExpire,
}: OTPCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(expireSeconds);

  useEffect(() => {
    setSecondsLeft(expireSeconds);
  }, [expireSeconds]);

  useEffect(() => {
    if (secondsLeft === 0) {
      onExpire?.();
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft, onExpire]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <p>OTP còn hiệu lực trong: {formatTime(secondsLeft)}</p>
      {secondsLeft === 0 && <p style={{ color: "red" }}>OTP đã hết hạn</p>}
    </div>
  );
}
