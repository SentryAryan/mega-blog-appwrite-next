"use client"
import React, { useId } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FieldErrors } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  label?: string;
  className?: string;
  errors?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options = [], label = '', className = '', errors, ...props }, ref) => {
    const id = useId();
    const radius = 100; // Radius for the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const background = useMotionTemplate`
      radial-gradient(
        ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
        var(--blue-500),
        transparent 80%
      )
    `;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = (event.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <motion.div
          style={{ background }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="p-[2px] rounded-lg transition duration-300 group/select relative"
        >
          <select
            ref={ref}
            id={id}
            {...props}
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input 
              rounded-md px-3 py-2 pr-10 text-sm appearance-none 
              focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 
              dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 
              dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
              group-hover/select:shadow-none transition duration-400`,
              className
            )}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* Custom Arrow */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
        {/* Error Message */}
        {errors && (
          <span className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;