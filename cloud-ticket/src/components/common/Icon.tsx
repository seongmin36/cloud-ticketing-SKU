interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  className?: string;
}

// 아이콘 컴포넌트
export default function Icon({
  icon: IconComponent,
  size = 16,
  width,
  height,
  color = "#525252",
  className = "",
  ...props
}: IconProps) {
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      color={color}
      className={className}
      {...props}
    />
  );
}
