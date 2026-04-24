import React from 'react';
import { cn } from '../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:opacity-90 shadow-md active:scale-95',
    outline: 'border border-border bg-background hover:bg-muted text-foreground active:scale-95',
    ghost: 'hover:bg-muted text-foreground active:scale-95',
    link: 'text-primary underline-offset-4 hover:underline',
    destructive: 'bg-destructive text-white hover:bg-destructive/90 shadow-md active:scale-95',
  };

  const sizes = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 px-4',
    lg: 'h-14 px-10 text-lg',
    icon: 'h-10 w-10 flex items-center justify-center',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-3xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-500',
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const Badge = ({ className, ...props }) => (
  <div
    className={cn(
        'inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
    )}
    {...props}
  />
);

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
