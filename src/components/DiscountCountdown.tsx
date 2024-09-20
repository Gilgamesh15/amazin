"use client";

import Countdown from "react-countdown";
import { Clock } from "lucide-react";

export interface DiscountCountdownProps {
  discountEndDateTime: Date;
}

export default function DiscountCountdown({
  discountEndDateTime,
}: DiscountCountdownProps) {
  return <Countdown date={discountEndDateTime} renderer={CountdownRenderer} />;
}

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function CountdownRenderer({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRendererProps) {
  if (completed) {
    return <span>Offer expired!</span>;
  }

  const padWithZero = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 bg-gradient-to-r from-destructive to-purple-600 p-4 rounded-lg text-white shadow-lg">
      <Clock className="w-6 h-6" />
      <div className="flex gap-4 sm:gap-8">
        <TimeUnit value={padWithZero(days)} label="Days" />
        <TimeUnit value={padWithZero(hours)} label="Hours" />
        <TimeUnit value={padWithZero(minutes)} label="Minutes" />
        <TimeUnit value={padWithZero(seconds)} label="Seconds" />
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: string;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs uppercase">{label}</span>
    </div>
  );
}
