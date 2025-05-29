import { useEffect, useState } from "react";
import "./CountdownTimer.less";

type CountdownTimerType = {
 endAt: string;
 showEndMessage?: boolean;
 text?: string;
};

const pad = (num: number) => String(num).padStart(2, "0");

export const CountdownTimer = ({
 endAt,
 showEndMessage = true,
 text,
}: CountdownTimerType) => {
 const [timeLeft, setTimeLeft] = useState<string>("");

 useEffect(() => {
  const updateTimer = () => {
   const endTime = new Date(endAt).getTime();
   const now = new Date().getTime();
   const distance = endTime - now;

   if (distance <= 0) {
    setTimeLeft("00:00:00");
    return;
   }

   const hours = Math.floor(distance / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
  };

  updateTimer();

  const interval = setInterval(updateTimer, 1000);

  return () => clearInterval(interval);
 }, [endAt]);

 if (timeLeft === "00:00:00") {
  return (
   <div className="count-time">
    {showEndMessage ? <p>Тест завершен</p> : ""}
   </div>
  );
 }

 return (
  <div className="count-time">
   <p>
    {text || "⏳ Тест завершится через:"} <strong>{timeLeft}</strong>
   </p>
  </div>
 );
};
