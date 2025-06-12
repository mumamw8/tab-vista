import React, { useState } from "react";
import BookmarkNode from "./BookmarkNode";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type Browser } from "wxt/browser";

const NODES_PER_ROW = 4; // Adjust this to match your layout
const ROWS_TO_SHOW = 2;
const MAX_NODES = NODES_PER_ROW * ROWS_TO_SHOW;

const BookmarkList: React.FC<{
  nodes: Browser.bookmarks.BookmarkTreeNode[];
  onFolderClick?: (
    children: Browser.bookmarks.BookmarkTreeNode[],
    title: string
  ) => void;
  title?: string;
}> = ({ nodes, onFolderClick, title }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleNodes = showAll ? nodes : nodes.slice(0, MAX_NODES);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {title && (
          <h2 className="text-xl custom-text-color font-bold">{title}</h2>
        )}
        {nodes.length > MAX_NODES && (
          <button
            className="flex opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out items-center gap-2 custom-text-color font-medium cursor-pointer mr-10"
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
      <div className="flex flex-wrap gap-2 py-2">
        {visibleNodes.map((node) => (
          <BookmarkNode
            key={node.id}
            node={node}
            onFolderClick={onFolderClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;
