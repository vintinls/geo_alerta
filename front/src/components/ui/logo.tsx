interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
    xxl: 'h-24',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src='/lovable-uploads/logoo.png'
        alt='Geo Alerta'
        className={sizeClasses[size]}
      />
    </div>
  );
};
