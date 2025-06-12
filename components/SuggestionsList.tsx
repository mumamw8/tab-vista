import React, { useEffect, useState } from "react";
import { faviconURL, faviconURLFromChrome } from "@/utils";
import clsx from "clsx";
import useCardStyle from "@/components/hooks/useCardStyle";

function sortHistoryItemsByTypedCount(
  historyItems: Browser.history.HistoryItem[]
): Browser.history.HistoryItem[] {
  // Filter out items that have neither typedCount nor visitCount, and blacklist chrome URLs
  const filteredItems = historyItems.filter(
    (item) =>
      // Check if URL exists and doesn't start with 'chrome'
      item.url &&
      !item.url.toLowerCase().startsWith("chrome") &&
      // Keep items that have either typedCount or visitCount
      ((item.typedCount !== undefined && item.typedCount > 0) ||
        (item.visitCount !== undefined && item.visitCount > 0))
  );

  return [...filteredItems].sort((a, b) => {
    // Handle undefined values by defaulting to 0
    const aTypedCount = a.typedCount ?? 0;
    const bTypedCount = b.typedCount ?? 0;
    const aVisitCount = a.visitCount ?? 0;
    const bVisitCount = b.visitCount ?? 0;

    // Calculate total score by adding typedCount and visitCount
    const aTotal = aTypedCount + aVisitCount;
    const bTotal = bTypedCount + bVisitCount;

    // Sort in descending order (higher total values first)
    return bTotal - aTotal;
  });
}

const SuggestionsList: React.FC = () => {
  const [history, setHistory] = useState<Browser.history.HistoryItem[]>([]);
  const { cardStyle } = useCardStyle();

  async function fetchHistory(
    setHistory: (items: Browser.history.HistoryItem[]) => void
  ) {
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
    const historyItems = await browser.history.search({
      text: "",
      startTime: oneWeekAgo,
    });
    const sortedHistory = sortHistoryItemsByTypedCount(historyItems);
    setHistory(sortedHistory.slice(0, 10));
  }

  useEffect(() => {
    fetchHistory(setHistory);
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold custom-text-color">Suggestions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {history.map((item, idx) => (
          <a
            href={item.url}
            title={item.title}
            aria-label={item.title}
            key={idx}
            className={clsx(
              "relative flex custom-text-color backdrop-blur-sm rounded-xl shadow-md p-4 items-center gap-4",
              cardStyle === "neutral" && "bg-white/5",
              cardStyle === "light" && "bg-white/20",
              cardStyle === "dark" && "bg-gray-900/20"
            )}
          >
            {item.url && <Favicon url={item.url} iconSize="32" size={16} />}
            <span className="custom-text-color text-[0.9rem] font-semibold truncate w-full">
              {item.title && item.title.length > 0 ? item.title : item.url}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsList;

function Favicon({
  url,
  size,
  iconSize,
}: {
  url: string;
  iconSize: string;
  size: number;
}) {
  const [src, setSrc] = useState<string | null | undefined>(undefined);

  // useEffect to check if the favicon returned by the google api is a custom favicon or a default favicon
  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      if (img.naturalHeight === 16 && img.naturalWidth === 16) {
        setSrc(null);
      } else {
        setSrc(faviconURL(url, iconSize));
      }
    };

    img.onerror = () => {
      setSrc(null);
    };

    img.src = faviconURL(url, iconSize);
  }, [url, iconSize]);

  if (src === undefined) {
    return null;
  }

  return (
    <img
      src={src ?? faviconURLFromChrome(url, iconSize) ?? ""}
      alt={`${url} favicon`}
      width={size}
      height={size}
      className="object-contain rounded-lg"
    />
  );
}
