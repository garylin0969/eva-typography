'use client';

import { useCallback, useEffect, useRef } from 'react';

/** EVA 畫布設定參數 */
export interface EvaCanvasConfig {
    /** 要繪製的文字 */
    text: string;
    /** 整張圖片的背景顏色 */
    canvasBgColor: string;
    /** 文字背景色（單一字元格的背景） */
    charBgColor: string;
    /** 文字顏色 */
    textColor: string;
    /** 字體大小 (px) */
    fontSize: number;
    /** 字元間距 (px) */
    gap: number;
    /** 內邊距 (px) */
    padding: number;
    /** 排列方向 */
    direction: 'horizontal' | 'vertical';
}

/** 預設設定值 */
export const DEFAULT_CONFIG: EvaCanvasConfig = {
    text: '',
    canvasBgColor: '#000000',
    charBgColor: '#1a1a2e',
    textColor: '#ffffff',
    fontSize: 72,
    gap: 8,
    padding: 24,
    direction: 'horizontal',
};

/**
 * 封裝 EVA 風格文字的 Canvas 繪製邏輯。
 *
 * 接受文字與樣式參數，透過 Canvas 2D API 即時繪製每個字元獨立成格的 EVA 標題風格圖片，
 * 並提供下載 PNG 的回呼函式。
 *
 * @param {EvaCanvasConfig} config - 畫布繪製設定
 * @return {{ canvasRef: React.RefObject<HTMLCanvasElement | null>, handleDownload: () => void }}
 */
const useEvaCanvas = (config: EvaCanvasConfig) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { text, canvasBgColor, charBgColor, textColor, fontSize, gap, padding, direction } = config;

        const chars = text.split('');

        if (chars.length === 0) {
            canvas.width = 0;
            canvas.height = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        const cellSize = fontSize * 1.4;
        const isHorizontal = direction === 'horizontal';
        const totalCells = chars.length;

        const canvasWidth = isHorizontal
            ? padding * 2 + totalCells * cellSize + (totalCells - 1) * gap
            : padding * 2 + cellSize;

        const canvasHeight = isHorizontal
            ? padding * 2 + cellSize
            : padding * 2 + totalCells * cellSize + (totalCells - 1) * gap;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // 繪製整張圖片背景
        ctx.fillStyle = canvasBgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 繪製每個字元
        chars.forEach((char, i) => {
            const x = isHorizontal ? padding + i * (cellSize + gap) : padding;
            const y = isHorizontal ? padding : padding + i * (cellSize + gap);

            // 繪製字元背景格
            ctx.fillStyle = charBgColor;
            ctx.fillRect(x, y, cellSize, cellSize);

            // 繪製文字
            ctx.fillStyle = textColor;
            ctx.font = `900 ${fontSize}px "Noto Sans TC", "Noto Sans JP", "Hiragino Kaku Gothic Pro", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, x + cellSize / 2, y + cellSize / 2);
        });
    }, [config]);

    /**
     * 將 Canvas 內容下載為 PNG 檔案。
     */
    const handleDownload = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'eva-text.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }, []);

    return { canvasRef, handleDownload };
};

export default useEvaCanvas;
