interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/lovable-uploads/d07c9e03-248c-4191-b34b-d39aba768d3e.png" 
        alt="Geo Alerta"
        className={sizeClasses[size]}
      />
    </div>
  );
};