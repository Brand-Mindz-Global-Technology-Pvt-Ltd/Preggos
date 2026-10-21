type WaveDividerProps = { fill: string; stroke?: string; flip?: boolean; className?: string };

export function WaveDivider({ fill, stroke, flip = false, className = "" }: WaveDividerProps) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 md:h-14 ${flip ? "rotate-180" : ""} ${className}`}><svg className="h-full w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false"><path d="M0 16C160 70 300 22 470 55s275 29 440-3 330 28 530-19v67H0Z" fill={fill} />{stroke && <path d="M0 13C160 67 300 19 470 52s275 29 440-3 330 28 530-19" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="3" />}</svg></div>;
}
