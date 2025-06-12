import React, { useEffect, useState } from "react";
import FaviconOrLetter from "./FaviconOrLetter";
import { getDomain } from "@/utils";
import { formatDistance } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { ChevronLeftIcon } from "lucide-react";
import clsx from "clsx";
import useCardStyle from "@/components/hooks/useCardStyle";
import { type Browser } from "wxt/browser";

const MAX_ITEMS = 6;

const ReadingList: React.FC = () => {
  const [readingList, setReadingList] = useState<
    Browser.readingList.ReadingListEntry[]
  >([]);
  const [showAll, setShowAll] = useState(false);
  const [getUnreadOnly, setGetUnreadOnly] = useState(true);
  const { cardStyle } = useCardStyle();
  const visibleItems = showAll ? readingList : readingList.slice(0, MAX_ITEMS);

  // Mark item as read when clicked
  const handleLinkClick = (url: string) => {
    browser.runtime.sendMessage(browser.runtime.id, {
      action: "updateReadingListItem",
      item: { url },
    });
  };

  async function fetchReadingList(unreadOnly: boolean = false) {
    const items = await browser.readingList.query({
      hasBeenRead: unreadOnly ? false : undefined,
    });
    // Sort items by creationTime (newest first)
    items.sort((a, b) => b.creationTime - a.creationTime);
    setReadingList(items);
  }
  // Get Reading List
  useEffect(() => {
    fetchReadingList(getUnreadOnly);
  }, [getUnreadOnly]);

  if (readingList.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-8 group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold custom-text-color">Reading List</h2>
        <div className="flex items-center gap-2">
          <button
            className="flex opacity-0 group-hover:opacity-55 hover:opacity-90 transition-all duration-150 ease-in-out items-center gap-2 custom-text-color cursor-pointer mr-10"
            onClick={() => setGetUnreadOnly((prev) => !prev)}
          >
            {getUnreadOnly ? "Unread" : "All"}
          </button>
          {readingList.length > MAX_ITEMS && (
            <button
              className="flex opacity-0 group-hover:opacity-90 transition-all duration-150 ease-in-out items-center gap-2 custom-text-color font-medium cursor-pointer mr-10"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "Show All"}
              {showAll ? (
                <ChevronLeftIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {visibleItems.map((item, idx) => (
          <a
            href={item.url}
            title={item.title}
            aria-label={item.title}
            key={idx}
            className={clsx(
              "relative flex custom-text-color backdrop-blur-sm rounded-xl shadow-md p-2 items-center gap-4",
              cardStyle === "neutral" && "bg-white/5",
              cardStyle === "light" && "bg-white/20",
              cardStyle === "dark" && "bg-gray-900/20"
            )}
            onClick={() => handleLinkClick(item.url)}
          >
            {!item.hasBeenRead && (
              <span
                className="absolute top-2 left-2 w-2 h-2 rounded-full bg-blue-500"
                title="Unread"
              ></span>
            )}
            <FaviconOrLetter title={item.title} url={item.url} iconSize={64} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold line-clamp-2 custom-text-color">
                  {item.title}
                </span>
              </div>
              <div className="text-xs w-full truncate mb-1 custom-text-color">
                {getDomain(item.url)}
              </div>
              <div className="text-xs custom-text-color">
                {formatDistance(new Date(item.creationTime), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReadingList;
