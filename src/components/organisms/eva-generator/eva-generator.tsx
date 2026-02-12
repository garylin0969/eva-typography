'use client';

import { ChangeEvent, useState } from 'react';
import { Download } from 'lucide-react';
import useEvaCanvas, { DEFAULT_CONFIG } from '@/hooks/use-eva-canvas';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * EVA 風格文字圖片生成器元件。
 *
 * 提供文字輸入、即時 Canvas 預覽、樣式微調控制面板，以及 PNG 下載功能。
 * 使用者可調整圖片背景色、文字背景色、文字色、字體大小、字元間距、內邊距與排列方向。
 */
const EvaGenerator = () => {
    const [text, setText] = useState(DEFAULT_CONFIG.text);
    const [canvasBgColor, setCanvasBgColor] = useState(DEFAULT_CONFIG.canvasBgColor);
    const [charBgColor, setCharBgColor] = useState(DEFAULT_CONFIG.charBgColor);
    const [textColor, setTextColor] = useState(DEFAULT_CONFIG.textColor);
    const [fontSize, setFontSize] = useState(DEFAULT_CONFIG.fontSize);
    const [gap, setGap] = useState(DEFAULT_CONFIG.gap);
    const [padding, setPadding] = useState(DEFAULT_CONFIG.padding);
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>(DEFAULT_CONFIG.direction);

    const { canvasRef, handleDownload } = useEvaCanvas({
        text,
        canvasBgColor,
        charBgColor,
        textColor,
        fontSize,
        gap,
        padding,
        direction,
    });

    const hasText = text.length > 0;

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleCanvasBgColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCanvasBgColor(e.target.value);
    };

    const handleCharBgColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCharBgColor(e.target.value);
    };

    const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextColor(e.target.value);
    };

    const handleDirectionChange = (value: string) => {
        setDirection(value as 'horizontal' | 'vertical');
    };

    const handleFontSizeChange = (value: number[]) => {
        setFontSize(value[0]);
    };

    const handleGapChange = (value: number[]) => {
        setGap(value[0]);
    };

    const handlePaddingChange = (value: number[]) => {
        setPadding(value[0]);
    };

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
            {/* 標題 */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">EVA 文字生成器</h1>
                <p className="text-muted-foreground mt-1 text-sm">輸入文字，即時產生新世紀福音戰士風格的文字圖片</p>
            </div>

            <Separator />

            {/* 文字輸入 */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="eva-text-input">輸入文字</Label>
                <Input
                    id="eva-text-input"
                    placeholder="請輸入文字，例如：使徒襲來"
                    value={text}
                    onChange={handleTextChange}
                    className="text-lg"
                />
            </div>

            {/* 主內容：預覽 + 控制面板 */}
            <div className="flex flex-col gap-6 lg:flex-row">
                {/* 預覽區 */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="text-base">即時預覽</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex min-h-50 items-center justify-center overflow-auto rounded-md border border-dashed p-4">
                            {hasText ? (
                                <canvas ref={canvasRef} />
                            ) : (
                                <p className="text-muted-foreground text-sm">請在上方輸入文字以預覽</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* 控制面板 */}
                <Card className="w-full lg:w-80">
                    <CardHeader>
                        <CardTitle className="text-base">樣式設定</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        {/* 排列方向 */}
                        <div className="flex flex-col gap-2">
                            <Label>排列方向</Label>
                            <Tabs value={direction} onValueChange={handleDirectionChange}>
                                <TabsList className="w-full">
                                    <TabsTrigger value="horizontal" className="flex-1">
                                        水平
                                    </TabsTrigger>
                                    <TabsTrigger value="vertical" className="flex-1">
                                        垂直
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <Separator />

                        {/* 顏色設定 */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-3">
                                <Label htmlFor="canvas-bg-color">背景顏色</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono text-xs">{canvasBgColor}</span>
                                    <Input
                                        id="canvas-bg-color"
                                        type="color"
                                        value={canvasBgColor}
                                        onChange={handleCanvasBgColorChange}
                                        className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <Label htmlFor="char-bg-color">文字背景色</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono text-xs">{charBgColor}</span>
                                    <Input
                                        id="char-bg-color"
                                        type="color"
                                        value={charBgColor}
                                        onChange={handleCharBgColorChange}
                                        className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <Label htmlFor="text-color">文字顏色</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono text-xs">{textColor}</span>
                                    <Input
                                        id="text-color"
                                        type="color"
                                        value={textColor}
                                        onChange={handleTextColorChange}
                                        className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Slider 控制 */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>字體大小</Label>
                                    <span className="text-muted-foreground font-mono text-xs">{fontSize}px</span>
                                </div>
                                <Slider
                                    value={[fontSize]}
                                    onValueChange={handleFontSizeChange}
                                    min={24}
                                    max={200}
                                    step={2}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>字元間距</Label>
                                    <span className="text-muted-foreground font-mono text-xs">{gap}px</span>
                                </div>
                                <Slider value={[gap]} onValueChange={handleGapChange} min={0} max={40} step={1} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>內邊距</Label>
                                    <span className="text-muted-foreground font-mono text-xs">{padding}px</span>
                                </div>
                                <Slider
                                    value={[padding]}
                                    onValueChange={handlePaddingChange}
                                    min={0}
                                    max={80}
                                    step={2}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* 下載按鈕 */}
                        <Button onClick={handleDownload} disabled={!hasText} className="w-full">
                            <Download className="mr-2 size-4" />
                            下載圖片
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EvaGenerator;
