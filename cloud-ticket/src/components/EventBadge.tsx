interface EventBadgeProps {
  label: string;
}

// 뱃지 컴포넌트
export default function EventBadge({ label }: EventBadgeProps) {
  return (
    <div className="inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-md border text-xs bg-[#F5F5F5] border-transparent text-[#525252]">
      {label}
    </div>
  );
}
