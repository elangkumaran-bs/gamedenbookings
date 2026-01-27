import React from 'react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function LiquidGlassButton({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantStyles = {
    default: {
      text: 'text-gray-700 dark:text-gray-200',
      bg: 'bg-white/40 dark:bg-gray-800/40',
      gradient: 'from-blue-500/20 to-purple-600/20',
      shadow: ''
    },
    primary: {
      text: 'text-white',
      bg: 'bg-gradient-to-r from-blue-500 to-purple-600',
      gradient: 'from-purple-600 to-pink-600',
      shadow: 'shadow-[0_0_20px_rgba(147,51,234,0.5)]'
    },
    secondary: {
      text: 'text-white',
      bg: 'bg-gradient-to-r from-purple-500 to-pink-600',
      gradient: 'from-pink-600 to-orange-600',
      shadow: 'shadow-[0_0_20px_rgba(219,39,119,0.5)]'
    },
    success: {
      text: 'text-white',
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      gradient: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]'
    },
    danger: {
      text: 'text-white',
      bg: 'bg-gradient-to-r from-red-500 to-rose-600',
      gradient: 'from-rose-600 to-pink-600',
      shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]'
    }
  };

  const styles = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group rounded-full
        font-semibold
        transition-all duration-300 ease-out
        overflow-hidden
        flex items-center justify-center
        ${sizeClasses[size]}
        ${styles.text}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Liquid Glass Background */}
      <div className={`
        absolute inset-0 rounded-full
        backdrop-blur-md
        transition-all duration-500 ease-out
        ${variant === 'default'
          ? `${styles.bg} opacity-0 group-hover:opacity-100`
          : `${styles.bg} opacity-100`
        }
        ${disabled ? 'group-hover:opacity-100' : ''}
      `}></div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`
          absolute inset-0 translate-x-[-100%] 
          ${!disabled ? 'group-hover:translate-x-[100%]' : ''}
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          transition-transform duration-700 ease-out
          ${variant === 'default' ? 'opacity-60' : 'opacity-100'}
        `}></div>
      </div>

      {/* Liquid Blob Effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-0 h-0 rounded-full
          ${!disabled ? 'group-hover:w-full group-hover:h-full' : ''}
          transition-all duration-500 ease-out
          bg-gradient-to-r ${styles.gradient}
        `}></div>
      </div>

      {/* Border Glow */}
      <div className={`
        absolute inset-0 rounded-full
        border border-white/30
        opacity-0 
        ${!disabled ? 'group-hover:opacity-100' : ''}
        transition-opacity duration-300
        ${styles.shadow}
      `}></div>

      {/* Content */}
      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </button>
  );
}

// Liquid Glass Card Component
export function LiquidGlassCard({ 
  children, 
  className = '',
  hover = true
}: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`
      relative group rounded-3xl overflow-hidden
      backdrop-blur-xl bg-white/70 dark:bg-gray-900/70
      border border-white/20
      shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
      transition-all duration-500 ease-out
      ${hover ? 'hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.24)] hover:scale-[1.02]' : ''}
      ${className}
    `}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
      
      {/* Shimmer Effect */}
      {hover && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Liquid Glass Input Component
export function LiquidGlassInput({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-2xl
          backdrop-blur-xl bg-white/50 dark:bg-gray-900/50
          border border-white/30
          focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
          transition-all duration-300
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          text-gray-900 dark:text-white
          shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]
          focus:shadow-[0_4px_16px_0_rgba(59,130,246,0.2)]
          outline-none
          ${className}
        `}
        {...props}
      />
      {/* Glow effect on focus */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
    </div>
  );
}

// Liquid Glass Select Component
export function LiquidGlassSelect({ 
  children,
  value,
  onChange,
  className = '',
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-2xl
          backdrop-blur-xl bg-white/50 dark:bg-gray-900/50
          border border-white/30
          focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
          transition-all duration-300
          text-gray-900 dark:text-white
          shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]
          focus:shadow-[0_4px_16px_0_rgba(59,130,246,0.2)]
          outline-none
          cursor-pointer
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {/* Glow effect on focus */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
    </div>
  );
}

// Liquid Glass Textarea Component
export function LiquidGlassTextarea({ 
  placeholder,
  value,
  onChange,
  className = '',
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="relative group">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-2xl
          backdrop-blur-xl bg-white/50 dark:bg-gray-900/50
          border border-white/30
          focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
          transition-all duration-300
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          text-gray-900 dark:text-white
          shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]
          focus:shadow-[0_4px_16px_0_rgba(59,130,246,0.2)]
          outline-none
          resize-none
          ${className}
        `}
        {...props}
      />
      {/* Glow effect on focus */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
    </div>
  );
}
