'use client';

import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import TitleCard from './title-card';

const EvaGenerator = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    const [topText, setTopText] = useState('neon genesis');
    const [bottomText, setBottomText] = useState('evangelion');
    const [episodeNum, setEpisodeNum] = useState('EPISODE:12');
    const [title, setTitle] = useState('使徒、襲來');
    const [theme, setTheme] = useState<'black-white' | 'white-black' | 'black-red'>('black-white');
    const [effectsEnabled, setEffectsEnabled] = useState(true);

    const [topTextSize, setTopTextSize] = useState([100]);
    const [bottomTextSize, setBottomTextSize] = useState([100]);
    const [episodeNumSize, setEpisodeNumSize] = useState([100]);
    const [titleSize, setTitleSize] = useState([100]);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toJpeg(cardRef.current, { quality: 0.95 });
            const link = document.createElement('a');
            link.download = 'eva-title.jpg';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">EVA 文字生成器</h1>
                <p className="text-muted-foreground mt-1 text-sm">輸入文字，即時產生經典的《新世紀福音戰士》標題卡</p>
            </div>

            <Separator />

            <div className="flex flex-col gap-6 lg:flex-row">
                <Card className="flex-[2] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-base">即時預覽</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0 flex items-center justify-center dark:bg-zinc-900 rounded-b-xl sm:rounded-none">
                        <div className="w-full shadow-2xl rounded overflow-hidden">
                            <TitleCard
                                ref={cardRef}
                                topText={topText}
                                bottomText={bottomText}
                                episodeNum={episodeNum}
                                title={title}
                                theme={theme}
                                effectsEnabled={effectsEnabled}
                                topTextSize={topTextSize[0]}
                                bottomTextSize={bottomTextSize[0]}
                                episodeNumSize={episodeNumSize[0]}
                                titleSize={titleSize[0]}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 w-full lg:min-w-[320px]">
                    <CardHeader>
                        <CardTitle className="text-base">樣式設定</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label>配色風格</Label>
                            <Tabs
                                value={theme}
                                onValueChange={(v) => setTheme(v as 'black-white' | 'white-black' | 'black-red')}
                            >
                                <TabsList className="w-full h-auto flex-col sm:flex-row">
                                    <TabsTrigger value="black-white" className="flex-1 py-2">
                                        黑底白字
                                    </TabsTrigger>
                                    <TabsTrigger value="white-black" className="flex-1 py-2">
                                        白底黑字
                                    </TabsTrigger>
                                    <TabsTrigger value="black-red" className="flex-1 py-2">
                                        黑底紅字
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="top-text">頂部文字 (Top Text)</Label>
                                    <span className="text-xs text-muted-foreground">{topTextSize[0]}%</span>
                                </div>
                                <Input id="top-text" value={topText} onChange={(e) => setTopText(e.target.value)} />
                                <Slider
                                    value={topTextSize}
                                    onValueChange={setTopTextSize}
                                    min={10}
                                    max={300}
                                    step={1}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="episode-num">集數 (Episode)</Label>
                                    <span className="text-xs text-muted-foreground">{episodeNumSize[0]}%</span>
                                </div>
                                <Input
                                    id="episode-num"
                                    value={episodeNum}
                                    onChange={(e) => setEpisodeNum(e.target.value)}
                                />
                                <Slider
                                    value={episodeNumSize}
                                    onValueChange={setEpisodeNumSize}
                                    min={10}
                                    max={300}
                                    step={1}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="title-text">主標題 (Main Title) - 支援換行</Label>
                                    <span className="text-xs text-muted-foreground">{titleSize[0]}%</span>
                                </div>
                                <Textarea
                                    id="title-text"
                                    rows={3}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="resize-none"
                                />
                                <Slider value={titleSize} onValueChange={setTitleSize} min={10} max={300} step={1} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="bottom-text">底部文字 (Bottom Text)</Label>
                                    <span className="text-xs text-muted-foreground">{bottomTextSize[0]}%</span>
                                </div>
                                <Input
                                    id="bottom-text"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                />
                                <Slider
                                    value={bottomTextSize}
                                    onValueChange={setBottomTextSize}
                                    min={10}
                                    max={300}
                                    step={1}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="retro-effects" className="cursor-pointer">
                                    復古電視濾鏡
                                </Label>
                                <span className="text-xs text-muted-foreground">開啟色差、模糊與掃描線效果</span>
                            </div>
                            <Switch id="retro-effects" checked={effectsEnabled} onCheckedChange={setEffectsEnabled} />
                        </div>

                        <Separator />

                        <Button onClick={handleDownload} className="w-full h-12 text-md mt-2">
                            <Download className="mr-2 size-5" />
                            下載圖片
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EvaGenerator;
