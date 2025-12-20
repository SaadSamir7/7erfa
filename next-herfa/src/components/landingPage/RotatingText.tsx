"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
    type ComponentPropsWithoutRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(" ");
}

export interface RotatingTextHandle {
    next: () => void;
    previous: () => void;
    jumpTo: (index: number) => void;
    reset: () => void;
}

type StaggerFrom = "first" | "last" | "center" | "random" | number;

interface WordObj {
    characters: string[];
    needsSpace: boolean;
}

interface RotatingTextProps extends ComponentPropsWithoutRef<"span"> {
    texts: string[];
    transition?: Record<string, unknown>;
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    animatePresenceMode?: "wait" | "sync" | "popLayout" | string;
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: StaggerFrom;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
    (props, ref) => {
        const {
            texts,
            transition = { type: "spring", damping: 25, stiffness: 300 },
            initial = { y: "100%", opacity: 0 },
            animate = { y: 0, opacity: 1 },
            exit = { y: "-120%", opacity: 0 },
            animatePresenceMode = "wait",
            animatePresenceInitial = false,
            rotationInterval = 2000,
            staggerDuration = 0,
            staggerFrom = "first",
            loop = true,
            auto = true,
            splitBy = "characters",
            onNext,
            mainClassName,
            splitLevelClassName,
            elementLevelClassName,
            ...rest
        } = props;

        const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

        // Segmenter has different runtime support — use a narrow, typed fallback.
        const splitIntoCharacters = (text: string): string[] => {
            // Prefer Intl.Segmenter when available for proper grapheme clusters.
            // Use a safe runtime check; if unavailable, fall back to Array.from(text).
            if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
                const SegmenterCtor = (Intl as any).Segmenter as new (
                    locale: string,
                    opts?: { granularity?: string }
                ) => {
                    segment: (input: string) => Iterable<{ segment: string }>;
                };
                const segmenter = new SegmenterCtor("en", {
                    granularity: "grapheme",
                });
                const out: string[] = [];
                for (const s of (segmenter.segment as any)(text)) {
                    out.push((s as { segment: string }).segment);
                }
                return out;
            }
            return Array.from(text);
        };

        const elements: WordObj[] = useMemo(() => {
            const currentText = texts[currentTextIndex] ?? "";
            if (splitBy === "characters") {
                const words = currentText.split(" ");
                return words.map((word, i) => ({
                    characters: splitIntoCharacters(word),
                    needsSpace: i !== words.length - 1,
                }));
            }
            if (splitBy === "words") {
                return currentText.split(" ").map((word, i, arr) => ({
                    characters: [word],
                    needsSpace: i !== arr.length - 1,
                }));
            }
            if (splitBy === "lines") {
                return currentText.split("\n").map((line, i, arr) => ({
                    characters: [line],
                    needsSpace: i !== arr.length - 1,
                }));
            }

            return currentText.split(splitBy).map((part, i, arr) => ({
                characters: [part],
                needsSpace: i !== arr.length - 1,
            }));
        }, [texts, currentTextIndex, splitBy]);

        const getStaggerDelay = useCallback(
            (index: number, totalChars: number) => {
                const total = totalChars;
                if (staggerFrom === "first")
                    return index * (staggerDuration ?? 0);
                if (staggerFrom === "last")
                    return (total - 1 - index) * (staggerDuration ?? 0);
                if (staggerFrom === "center") {
                    const center = Math.floor(total / 2);
                    return Math.abs(center - index) * (staggerDuration ?? 0);
                }
                if (staggerFrom === "random") {
                    const randomIndex = Math.floor(Math.random() * total);
                    return (
                        Math.abs(randomIndex - index) * (staggerDuration ?? 0)
                    );
                }
                if (typeof staggerFrom === "number") {
                    return (
                        Math.abs(staggerFrom - index) * (staggerDuration ?? 0)
                    );
                }
                return index * (staggerDuration ?? 0);
            },
            [staggerFrom, staggerDuration]
        );

        const handleIndexChange = useCallback(
            (newIndex: number) => {
                setCurrentTextIndex(newIndex);
                if (onNext) onNext(newIndex);
            },
            [onNext]
        );

        const next = useCallback(() => {
            const nextIndex =
                currentTextIndex === texts.length - 1
                    ? loop
                        ? 0
                        : currentTextIndex
                    : currentTextIndex + 1;
            if (nextIndex !== currentTextIndex) {
                handleIndexChange(nextIndex);
            }
        }, [currentTextIndex, texts.length, loop, handleIndexChange]);

        const previous = useCallback(() => {
            const prevIndex =
                currentTextIndex === 0
                    ? loop
                        ? texts.length - 1
                        : currentTextIndex
                    : currentTextIndex - 1;
            if (prevIndex !== currentTextIndex) {
                handleIndexChange(prevIndex);
            }
        }, [currentTextIndex, texts.length, loop, handleIndexChange]);

        const jumpTo = useCallback(
            (index: number) => {
                const validIndex = Math.max(
                    0,
                    Math.min(index, texts.length - 1)
                );
                if (validIndex !== currentTextIndex) {
                    handleIndexChange(validIndex);
                }
            },
            [texts.length, currentTextIndex, handleIndexChange]
        );

        const reset = useCallback(() => {
            if (currentTextIndex !== 0) {
                handleIndexChange(0);
            }
        }, [currentTextIndex, handleIndexChange]);

        useImperativeHandle(
            ref,
            () => ({
                next,
                previous,
                jumpTo,
                reset,
            }),
            [next, previous, jumpTo, reset]
        );

        useEffect(() => {
            if (!auto) return;
            const intervalId = setInterval(next, rotationInterval);
            return () => clearInterval(intervalId);
        }, [next, rotationInterval, auto]);

        // Casting some props to `any` for compatibility with the motion/react
        // runtime types. These casts are intentionally narrow and should be
        // safe because the runtime values are motion-compatible.
        return (
            <motion.span
                className={cn(
                    "flex flex-wrap whitespace-pre-wrap relative",
                    mainClassName
                )}
                {...(rest as any)}
                layout
                transition={transition as any}>
                <span className="sr-only">{texts[currentTextIndex]}</span>
                <AnimatePresence
                    mode={animatePresenceMode as any}
                    initial={animatePresenceInitial}>
                    <motion.span
                        key={currentTextIndex}
                        className={cn(
                            splitBy === "lines"
                                ? "flex flex-col w-full"
                                : "flex flex-wrap whitespace-pre-wrap relative"
                        )}
                        layout
                        aria-hidden="true">
                        {elements.map((wordObj, wordIndex, array) => {
                            const previousCharsCount = array
                                .slice(0, wordIndex)
                                .reduce(
                                    (sum, word) => sum + word.characters.length,
                                    0
                                );
                            return (
                                <span
                                    key={wordIndex}
                                    className={cn(
                                        "inline-flex",
                                        splitLevelClassName
                                    )}>
                                    {wordObj.characters.map(
                                        (char, charIndex) => (
                                            <motion.span
                                                key={charIndex}
                                                initial={initial as any}
                                                animate={animate as any}
                                                exit={exit as any}
                                                transition={{
                                                    ...(transition as any),
                                                    delay: getStaggerDelay(
                                                        previousCharsCount +
                                                            charIndex,
                                                        array.reduce(
                                                            (sum, word) =>
                                                                sum +
                                                                word.characters
                                                                    .length,
                                                            0
                                                        )
                                                    ),
                                                }}
                                                className={cn(
                                                    "inline-block",
                                                    elementLevelClassName
                                                )}>
                                                {char}
                                            </motion.span>
                                        )
                                    )}
                                    {wordObj.needsSpace && (
                                        <span className="whitespace-pre">
                                            {" "}
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </motion.span>
                </AnimatePresence>
            </motion.span>
        );
    }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
