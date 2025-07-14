export function Badge({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <span
      className={`border rounded-4xl p-2 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
