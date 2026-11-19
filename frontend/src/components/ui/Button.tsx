export function Button({
  children,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-orange px-6 py-4 font-semibold text-white shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:bg-[#d84b18] active:translate-y-0 active:scale-[0.985] active:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
    >
      {children}
    </button>
  );
}
