import React from 'react';
import { EntityTag } from '../types';
import { Church, Home, Sparkles } from 'lucide-react';

interface EntityBadgeProps {
  tag: EntityTag;
  size?: 'sm' | 'md' | 'tall';
  showIcon?: boolean;
  className?: string;
}

export const ENTITY_CONFIG: Record<
  EntityTag,
  {
    label: string;
    shortLabel: string;
    bg: string;
    text: string;
    border: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  kirke: {
    label: 'Høvåg kirke',
    shortLabel: 'Kirke',
    bg: 'bg-sky-50',
    text: 'text-sky-950',
    border: 'border-sky-300',
    icon: Church,
  },
  bedehus: {
    label: 'Høvåg bedehus',
    shortLabel: 'Bedehus',
    bg: 'bg-emerald-50',
    text: 'text-emerald-950',
    border: 'border-emerald-300',
    icon: Home,
  },
  push: {
    label: 'PUSH Ungdom',
    shortLabel: 'PUSH',
    bg: 'bg-purple-50',
    text: 'text-purple-950',
    border: 'border-purple-300',
    icon: Sparkles,
  },
};

export const EntityBadge: React.FC<EntityBadgeProps> = ({
  tag,
  size = 'sm',
  showIcon = true,
  className = '',
}) => {
  const config = ENTITY_CONFIG[tag] || ENTITY_CONFIG.kirke;
  const Icon = config.icon;

  const sizeClasses =
    size === 'tall'
      ? 'h-11 px-3 text-[11px] rounded-xl gap-1.5 whitespace-nowrap'
      : size === 'sm'
      ? 'px-2 py-0.5 text-[10px] rounded-lg gap-1'
      : 'px-2.5 py-1 text-xs rounded-lg gap-1';

  const iconClasses =
    size === 'tall'
      ? 'w-3.5 h-3.5 shrink-0'
      : size === 'sm'
      ? 'w-2.5 h-2.5 shrink-0'
      : 'w-3 h-3 shrink-0';

  return (
    <span
      className={`inline-flex items-center font-extrabold border ${config.bg} ${config.text} ${config.border} ${sizeClasses} shrink-0 shadow-2xs ${className}`}
    >
      {showIcon && <Icon className={iconClasses} />}
      <span>{config.label}</span>
    </span>
  );
};
