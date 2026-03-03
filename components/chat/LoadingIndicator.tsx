export default function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-neutral-800 text-neutral-200 rounded-lg px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
}
