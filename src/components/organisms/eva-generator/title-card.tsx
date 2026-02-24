'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface TitleCardProps {
    topText: string;
    bottomText: string;
    episodeNum: string;
    title: string;
    theme: 'black-white' | 'white-black' | 'black-red';
    effectsEnabled: boolean;
    topTextSize: number;
    bottomTextSize: number;
    episodeNumSize: number;
    titleSize: number;
}

const TitleCard = forwardRef<HTMLDivElement, TitleCardProps>(
    ({ topText, bottomText, episodeNum, title, theme, effectsEnabled, topTextSize, bottomTextSize, episodeNumSize, titleSize }, ref) => {
        const isBlackBg = theme === 'black-white' || theme === 'black-red';
        const isRedText = theme === 'black-red';

        const bgColor = isBlackBg ? 'bg-black' : 'bg-white';
        const primaryTextColor = isBlackBg ? (isRedText ? 'text-red-600' : 'text-white') : 'text-black';
        const secondaryTextColor = isBlackBg ? (isRedText ? 'text-red-600' : 'text-white') : 'text-black';

        const titleLines = title.split('\n');

        return (
            <div
                ref={ref}
                className={cn(
                    'relative w-full aspect-video flex flex-col items-center justify-center overflow-hidden',
                    bgColor,
                    effectsEnabled && 'eva-effects'
                )}
                style={{ minHeight: '400px' }}
            >

                {effectsEnabled && (
                    <div className="pointer-events-none absolute inset-0 z-50 opacity-20 mix-blend-overlay">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />
                    </div>
                )}


                <div
                    className={cn(
                        'absolute top-[12%] text-center tracking-tighter uppercase font-bold text-5xl md:text-7xl lg:text-8xl',
                        secondaryTextColor
                    )}
                    style={{ 
                        fontFamily: 'var(--font-geist-sans), Helvetica, sans-serif',
                        transform: `scale(${topTextSize / 100}, ${(topTextSize / 100) * 1.5})`
                    }}
                >
                    {topText}
                </div>


                <div
                    className={cn(
                        'absolute bottom-[35%] w-full text-center tracking-wider uppercase font-bold text-2xl md:text-3xl lg:text-4xl',
                        secondaryTextColor
                    )}
                    style={{ 
                        fontFamily: 'var(--font-geist-sans), Helvetica, sans-serif',
                        transform: `scale(${episodeNumSize / 100}, ${(episodeNumSize / 100) * 1.25})`
                    }}
                >
                    {episodeNum}
                </div>


                <div
                    className={cn(
                        'absolute bottom-[10%] text-center tracking-tighter uppercase font-bold text-6xl md:text-8xl lg:text-[10rem]',
                        secondaryTextColor
                    )}
                    style={{ 
                        fontFamily: 'var(--font-geist-sans), Helvetica, sans-serif', 
                        lineHeight: '1',
                        transform: `scale(${bottomTextSize / 100}, ${(bottomTextSize / 100) * 1.5})`
                    }}
                >
                    {bottomText}
                </div>


                <div
                    className={cn(
                        'z-10 flex flex-col items-center justify-center text-center',
                        primaryTextColor
                    )}
                    style={{
                        fontFamily: 'var(--font-noto-serif-tc), serif',
                        transform: `scale(${titleSize / 100})`
                    }}

                >
                    {titleLines.map((line, idx) => (
                        <h1
                            key={idx}
                            className={cn(
                                'font-black leading-[0.85] tracking-tight',
                                'text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]',
                                effectsEnabled && 'eva-chromatic'
                            )}
                        >
                            {line}
                        </h1>
                    ))}
                </div>
            </div>
        );
    }
);

TitleCard.displayName = 'TitleCard';

export default TitleCard;
