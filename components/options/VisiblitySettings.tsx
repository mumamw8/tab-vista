import React, { useEffect, useState } from "react";
// import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff } from "lucide-react";
import {
  RootNodesVisibilitySettingsType,
  VisibilitySettingsType,
} from "./ExtensionSettings";
import useTextColor from "../hooks/useTextColor";
import { type Browser } from "wxt/browser";

type RootNodesTitleDictionaryType = {
  [nodeId: string]: string;
};
const VisibilitySettings: React.FC = () => {
  // const { textColor } = useTheme();
  const { textColor } = useTextColor();
  const [visibilitySettings, setVisibilitySettings] =
    useState<VisibilitySettingsType>({
      readingList: true,
      suggestionsList: true,
    });
  const [isInitialized, setIsInitialized] = useState(false);
  const [rootNodesVisibilitySettings, setRootNodesVisibilitySettings] =
    useState<RootNodesVisibilitySettingsType>({});
  const [rootNodeIds, setRootNodeIds] = useState<string[]>([]);
  const [rootNodesTitleDictionary, setRootNodesTitleDictionary] =
    useState<RootNodesTitleDictionaryType>({});
  const [showReadingListButton, setShowReadingListButton] = useState(true);

  async function fetchRootNodeIdsAndTitles(
    setRootNodeIds: (ids: string[]) => void,
    setRootNodesTitleDictionary: (dict: RootNodesTitleDictionaryType) => void
  ) {
    const bookMarkTreeNodes = await browser.bookmarks.getTree();
    if (!bookMarkTreeNodes || bookMarkTreeNodes.length === 0) return;
    const root = bookMarkTreeNodes[0];
    if (root.children && root.children.length > 0) {
      setRootNodeIds(root.children.map((child) => child.id));
      setRootNodesTitleDictionary(
        root.children.reduce<RootNodesTitleDictionaryType>((acc, child) => {
          acc[child.id] = child.title;
          return acc;
        }, {})
      );
    }
  }

  async function fetchOrInitRootNodesVisibilitySettings(
    rootNodeIds: string[],
    setRootNodesVisibilitySettings: (
      settings: RootNodesVisibilitySettingsType
    ) => void
  ) {
    if (rootNodeIds.length > 0) {
      const result = await browser.storage.local.get([
        "rootNodesVisibilitySettings",
      ]);
      if (result.rootNodesVisibilitySettings) {
        setRootNodesVisibilitySettings(result.rootNodesVisibilitySettings);
      } else {
        const rootNodesVisibilitySettingsObject =
          rootNodeIds.reduce<RootNodesVisibilitySettingsType>((acc, nodeId) => {
            acc[nodeId] = true;
            return acc;
          }, {});
        await browser.storage.local.set({
          rootNodesVisibilitySettings: rootNodesVisibilitySettingsObject,
        });
        setRootNodesVisibilitySettings(rootNodesVisibilitySettingsObject);
      }
    }
  }

  async function fetchReadingList(
    setShowReadingListButton: (show: boolean) => void
  ) {
    const items = await browser.readingList.query({ hasBeenRead: undefined });
    setShowReadingListButton(items.length > 0);
  }

  async function fetchOrInitVisibilitySettings(
    setVisibilitySettings: (settings: VisibilitySettingsType) => void,
    setIsInitialized: (initialized: boolean) => void
  ) {
    const result = await browser.storage.local.get(["visibilitySettings"]);
    if (result.visibilitySettings) {
      setVisibilitySettings(result.visibilitySettings);
      setIsInitialized(true);
    } else {
      await browser.storage.local.set({
        visibilitySettings: { readingList: true, suggestionsList: true },
      });
      setIsInitialized(true);
    }
  }

  async function saveVisibilitySettings(
    visibilitySettings: VisibilitySettingsType
  ) {
    await browser.storage.local.set({ visibilitySettings });
  }

  async function saveRootNodesVisibilitySettings(
    rootNodesVisibilitySettings: RootNodesVisibilitySettingsType
  ) {
    await browser.storage.local.set({ rootNodesVisibilitySettings });
  }

  const toggleVisibility = (section: keyof VisibilitySettingsType) => {
    setVisibilitySettings((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const toggleRootNodeVisibility = (nodeId: string) => {
    setRootNodesVisibilitySettings((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Get and set root node Ids
  useEffect(() => {
    fetchRootNodeIdsAndTitles(setRootNodeIds, setRootNodesTitleDictionary);
  }, []);
  // Set Root Nodes Visibility Settings
  useEffect(() => {
    fetchOrInitRootNodesVisibilitySettings(
      rootNodeIds,
      setRootNodesVisibilitySettings
    );
  }, [rootNodeIds, rootNodeIds.length]);

  useEffect(() => {
    fetchReadingList(setShowReadingListButton);
    fetchOrInitVisibilitySettings(setVisibilitySettings, setIsInitialized);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveVisibilitySettings(visibilitySettings);
    }
  }, [visibilitySettings, isInitialized]);

  useEffect(() => {
    if (Object.keys(rootNodesVisibilitySettings).length > 0) {
      saveRootNodesVisibilitySettings(rootNodesVisibilitySettings);
    }
  }, [rootNodesVisibilitySettings]);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="w-full" style={{ color: textColor }}>
      <h3 className="text-sm font-medium mb-3">Content Visibility</h3>
      <div className="space-y-3">
        {/* Root Nodes Visibility Settings */}
        <div
          className="flex flex-col gap-2 p-2 rounded-lg w-full"
          style={{ backgroundColor: `${textColor}10` }}
        >
          <h3 className="text-sm">Bookmarks</h3>
          {rootNodeIds.map((nodeId) => (
            <button
              key={nodeId}
              onClick={() => toggleRootNodeVisibility(nodeId)}
              className="w-full cursor-pointer flex items-center justify-between p-1 rounded-lg transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10"
              style={{ backgroundColor: `${textColor}10` }}
            >
              <span>{rootNodesTitleDictionary[nodeId]}</span>
              {rootNodesVisibilitySettings[nodeId] ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          ))}
        </div>
        {/* Suggestions List Button */}
        <button
          onClick={() => toggleVisibility("suggestionsList")}
          className="w-full cursor-pointer flex items-center justify-between p-2 rounded-lg transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10"
          style={{ backgroundColor: `${textColor}10` }}
        >
          <span>Suggestions List</span>
          {visibilitySettings.suggestionsList ? (
            <Eye size={18} />
          ) : (
            <EyeOff size={18} />
          )}
        </button>

        {/* Reading List Button */}
        {showReadingListButton && (
          <button
            onClick={() => toggleVisibility("readingList")}
            className="w-full cursor-pointer flex items-center justify-between p-2 rounded-lg transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10"
            style={{ backgroundColor: `${textColor}10` }}
          >
            <span>Reading List</span>
            {visibilitySettings.readingList ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default VisibilitySettings;
