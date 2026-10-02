import Link from "next/link";

interface Props {
  title?: string;
  message?: string;
  href?: string;
  linkLabel?: string;
}

export default function NotFoundState({
  title = "Page not found",
  message = "The page you're looking for doesn't exist.",
  href = "/",
  linkLabel = "Go home",
}: Props) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      <Link
        href={href}
        className="mt-4 inline-block rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        {linkLabel}
      </Link>
    </div>
  );
}