'use client';

import { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

export default function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'w-4 h-4 text-base',
        md: 'w-5 h-5 text-lg',
        lg: 'w-6 h-6 text-xl'
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                const Icon = isFilled ? RiStarFill : RiStarLine;

                return (
                    <button
                        key={star}
                        type="button"
                        className={`${sizeClasses[size]} flex items-center justify-center ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'
                            }`}
                        onClick={() => !readonly && onRatingChange?.(star)}
                        onMouseEnter={() => !readonly && setHoverRating(star)}
                        onMouseLeave={() => !readonly && setHoverRating(0)}
                        disabled={readonly}
                    >
                        <Icon className={isFilled ? 'text-yellow-400' : 'text-gray-300'} />
                    </button>
                );
            })}
        </div>
    );
}
