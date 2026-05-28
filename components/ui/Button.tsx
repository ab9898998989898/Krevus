'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGsapMagneticButton } from '@/hooks/useGsapMagneticButton'

interface ButtonProps {
  variant: 'primary' | 'outline' | 'ghost' | 'amber'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: React.MouseEventHandler<any>
  children: React.ReactNode
  className?: string
  magnetic?: boolean
}

export function Button({
  variant,
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  magnetic = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  // Conditionally call hooks is bad practice, but since `magnetic` is usually static per component instance, 
  // we can use a wrapper or just always call it but exit early inside the hook.
  // We'll call the hook directly. The hook itself checks if `btnRef.current` exists.
  // Wait, if magnetic is false, we can still call the hook but pass a null ref so it does nothing.
  
  const hookRef = magnetic ? btnRef : { current: null }
  useGsapMagneticButton(hookRef as React.RefObject<HTMLElement>)

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 cursor-pointer text-btn'
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3.5',
    lg: 'px-9 py-4 text-base'
  }

  const variantStyles = {
    primary: 'bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] active:scale-95',
    outline: 'border border-[color:var(--accent)] text-[color:var(--accent)] bg-transparent hover:bg-[color:var(--accent-glow)]',
    ghost: 'text-[color:var(--accent)] bg-transparent hover:underline',
    amber: 'bg-[color:var(--amber)] text-white hover:bg-[color:var(--amber-hover)] active:scale-95'
  }

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} ref={btnRef as React.RefObject<HTMLAnchorElement>} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} ref={btnRef as React.RefObject<HTMLButtonElement>} onClick={onClick}>
      {children}
    </button>
  )
}
