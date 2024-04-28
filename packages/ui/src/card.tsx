export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white/20">
      <h1 className="text-xl border-b border-gray-300 pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
