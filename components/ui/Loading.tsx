interface Props {
  message?: string;
  className?: string;
}

export default function Loading({
  message = "Loading…",
  className = "",
}: Props) {
  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-20 ${className}`}
    >
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
