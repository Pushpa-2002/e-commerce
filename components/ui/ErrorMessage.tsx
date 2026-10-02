"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  className?: string;
}

export default function ErrorMessage({
  error,
  reset,
  title = "Something went wrong",
  className = "",
}: Props) {
  return (
    <div
      className={`mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center ${className}`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">
        {error.message || "Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
