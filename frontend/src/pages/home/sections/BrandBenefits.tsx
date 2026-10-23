export function BrandBenefits() {
  const benefits = [
    {
      title: "Traditional Goodness",
      text: "Inspired by time-tested recipes",
      bg: "bg-[#EAF5FD]",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="shrink-0 text-[#0E8276]"
          aria-hidden="true"
        >
          {/* Droplet / leaf above */}
          <path
            d="M 14 3 C 14 3 10.5 7.5 10.5 9.5 C 10.5 11.4 12 13 14 13 C 16 13 17.5 11.4 17.5 9.5 C 17.5 7.5 14 3 14 3 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line x1="14" y1="6" x2="14" y2="11" stroke="currentColor" strokeWidth="1.4" />
          {/* Bowl rim */}
          <path
            d="M 5 13 C 5 13 8 15 14 15 C 20 15 23 13 23 13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Bowl body & foot */}
          <path
            d="M 5 13 C 5.5 19 9 22 14 22 C 19 22 22.5 19 23 13"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M 10 22 L 9 24.5 L 19 24.5 L 18 22"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Mam Approved",
      text: "Created for real motherhood",
      bg: "bg-[#F1EDFC]",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="shrink-0 text-[#5B429A]"
          aria-hidden="true"
        >
          {/* Mother head & hair */}
          <circle cx="12" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M 8.5 7.5 C 8.5 5 10 3.5 13.5 4 C 15.5 4.5 15.5 7 15 8.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Mother body */}
          <path
            d="M 7.5 24 C 7.5 17 9 13.5 13 13.5 C 14.5 13.5 16 14.5 17 16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Baby head & body */}
          <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M 15 24 C 15 21 16.5 19.5 18 20 C 19.5 20.5 20.5 22 20.5 24"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Arms cradling */}
          <path
            d="M 10 17 C 11.5 20 14 21 17 21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Science Backed",
      text: "Balanced nutrition for better health",
      bg: "bg-[#EAF6F0]",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="shrink-0 text-[#0E8276]"
          aria-hidden="true"
        >
          {/* Primary leaf */}
          <path
            d="M 7 22 C 7 22 8 13 16 9 C 23 5 24 4 24 4 C 24 4 22 13 15 17 C 10 20 7 22 7 22 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 7 22 C 10 18 14 14 18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Second leaf */}
          <path
            d="M 10 18 C 7 14 7 8 12 7 C 14 8 14 11 12 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Guilt-Free Snacking",
      text: "Healthy treats they actually love",
      bg: "bg-[#FDEEE3]",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="shrink-0 text-[#F57C00]"
          aria-hidden="true"
        >
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="10.5" cy="11.5" r="1.2" fill="currentColor" />
          <circle cx="17.5" cy="11.5" r="1.2" fill="currentColor" />
          <path
            d="M 9.5 15.5 C 10.5 18.5 17.5 18.5 18.5 15.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-x-clip bg-[#FFFDF7] px-4 py-3.5 sm:px-6 md:py-4 lg:px-8">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-3.5 xl:gap-5">
        {/* Left Group: Botanical leaves branch + Heading with Doodle Rays & Heart */}
        <div className="flex shrink-0 items-center justify-center gap-2 sm:gap-2.5 lg:justify-start">
          {/* Teal botanical branch - cleanly positioned within layout, never clipped */}
          <div className="shrink-0" aria-hidden="true">
            <svg
              width="30"
              height="64"
              viewBox="0 0 30 64"
              fill="none"
              className="text-[#0E8276]"
            >
              <path
                d="M 5 62 C 8 45 10 30 19 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Bottom leaf (left) */}
              <path
                d="M 6 51 C 1 47 1 40 5 38 C 10 40 9 47 6 51 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M 6 51 C 5 45 5 42 5 38" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              {/* Middle leaf (right) */}
              <path
                d="M 9 38 C 14 34 20 35 22 40 C 18 43 13 43 9 38 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M 9 38 C 13 39 17 40 22 40" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              {/* Upper leaf (left) */}
              <path
                d="M 13 25 C 8 21 8 15 12 13 C 17 15 16 21 13 25 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M 13 25 C 12 20 12 16 12 13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              {/* Top leaf (right) */}
              <path
                d="M 17 13 C 21 8 26 8 28 12 C 24 15 20 16 17 13 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M 17 13 C 21 13 24 13 28 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>

          {/* Heading with yellow doodle rays and heart */}
          <div className="relative shrink-0 text-left">
            {/* Yellow Doodle Rays surrounding heading */}
            <svg
              className="pointer-events-none absolute -left-5 -top-4.5 h-[92px] w-[184px] overflow-visible"
              viewBox="0 0 184 92"
              fill="none"
              aria-hidden="true"
            >
              {/* Top rays */}
              <line x1="38" y1="13" x2="33" y2="2" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="68" y1="12" x2="67" y2="1" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="98" y1="13" x2="103" y2="2" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              {/* Sprout near Moms */}
              <path
                d="M 122 14 C 122 9 125 4 126 4 C 127 7 131 5 133 8"
                stroke="#FDB813"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Left rays */}
              <line x1="14" y1="26" x2="3" y2="22" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="13" y1="46" x2="2" y2="49" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              {/* Bottom rays */}
              <line x1="36" y1="75" x2="30" y2="86" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="58" y1="76" x2="55" y2="87" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="86" y1="76" x2="88" y2="87" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="116" y1="75" x2="121" y2="86" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="144" y1="73" x2="152" y2="83" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
            </svg>

            <h2 className="relative z-10 font-display text-[26px] font-bold leading-[1.08] text-[#0C2340] sm:text-[27px] lg:text-[28px]">
              <span className="block">Why Moms</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span>Love Preggos</span>
                <svg
                  className="-mt-0.5 inline-block rotate-[14deg] text-[#EF6241] shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {/* Four Compact Cards: 2 per row on mobile, 4 on desktop */}
        <div className="grid flex-1 grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-2.5 xl:gap-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className={`${b.bg} flex h-[62px] sm:h-[68px] items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-transform duration-200 hover:-translate-y-0.5`}
            >
              <div className="shrink-0 scale-90 sm:scale-100">{b.icon}</div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[11px] font-bold leading-tight text-[#0C2340] sm:text-[13px]">
                  {b.title}
                </h3>
                <p className="truncate mt-0.5 text-[9px] leading-snug text-[#50617A] sm:text-[11px]">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default BrandBenefits;
