import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Serif_TC } from 'next/font/google';

import './globals.css';
import { ReactNode } from 'react';
import { cn } from '@/utils';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const notoSerifTC = Noto_Serif_TC({
    weight: ['900'],
    variable: '--font-noto-serif-tc',
    subsets: ['latin'],
    preload: false,
});

export const metadata: Metadata = {
    title: 'EVA 文字生成器',
    description: '輸入文字即時產生新世紀福音戰士風格的文字圖片',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="zh-TW">
            <body className={cn('antialiased', geistSans.variable, geistMono.variable, notoSerifTC.variable)}>{children}</body>
        </html>
    );
}
