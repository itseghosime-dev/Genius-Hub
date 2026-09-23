import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  type ButtonSize,
  type ButtonVariant,
  buttonSizeClasses,
  buttonVariantClasses,
} from './Button';

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  external?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className,
  href,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  external = false,
  ...props
}) => {
  const commonClasses = cn(
    'inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 cursor-pointer select-none no-underline',
    'focus-visible:outline-2 focus-visible:outline-(--focus-ring) focus-visible:outline-offset-2',
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  );

  if (external || href.startsWith('http')) {
    return (
      <a href={href} className={commonClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={commonClasses} {...props}>
      {leftIcon && (
        <span className="shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </Link>
  );
};
