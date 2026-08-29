'use client';

import type { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectDropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  leading?: ReactNode;
  options: readonly SelectDropdownOption[];
  compact?: boolean;
}

export function SelectDropdown({ label, leading, options, compact = false, className = '', ...props }: SelectDropdownProps) {
  return (
    <label className={`select-dropdown ${compact ? 'compact' : ''} ${className}`.trim()}>
      {label ? <span className="select-dropdown-label">{label}</span> : null}
      <span className="select-dropdown-control">
        {leading ? <span className="select-dropdown-leading" aria-hidden="true">{leading}</span> : null}
        <select {...props}>
          {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
        </select>
        <span className="select-dropdown-chevron" aria-hidden="true">⌄</span>
      </span>
    </label>
  );
}
