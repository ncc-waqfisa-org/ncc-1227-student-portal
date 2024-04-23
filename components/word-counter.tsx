import React from "react";

import { useTranslation } from "react-i18next";
import { cn } from "../src/lib/utils";

interface WordCounterProps {
  value: string | undefined | null;
  maxWords: number;
  className?: string;
}

const WordCounter: React.FC<WordCounterProps> = ({
  value,
  maxWords,
  className,
}) => {
  const { t } = useTranslation("common");
  // Function to count words
  const countWords = (text: string) => {
    return text.split(/\s+/).filter(Boolean).length; // Split by whitespace and filter out empty strings
  };

  const wordCount = countWords(value ?? "");

  return (
    <div className={cn(wordCount > maxWords && "text-error", className)}>
      {wordCount}/{maxWords} {t("words")}
    </div>
  );
};

export default WordCounter;
