import { CollapseIcon, ExpandIcon } from "@/components/icons";

interface ChatHeaderProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ChatHeader({
  isExpanded,
  onToggleExpand,
}: ChatHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between ">
      <div>
        <h3 className="text-sm font-medium text-neutral-100">
          Ad Skin Assistant
        </h3>
        <p className="text-xs text-neutral-500">Critical theory chatbot</p>
      </div>
      <button
        onClick={onToggleExpand}
        className="p-2 hover:bg-neutral-800 rounded transition-colors"
        aria-label={isExpanded ? "Minimize" : "Expand"}
      >
        {isExpanded ? (
          <CollapseIcon className="w-4 h-4 text-neutral-400" />
        ) : (
          <ExpandIcon className="w-4 h-4 text-neutral-400" />
        )}
      </button>
    </div>
  );
}
