export const CARD_STYLE_STORAGE_KEY = "cardStyle";
export const DARK_BACKGROUND_COLOR_STORAGE_KEY = "darkBackgroundColor";
export const LIGHT_BACKGROUND_COLOR_STORAGE_KEY = "lightBackgroundColor";
export const DARK_TEXT_COLOR_STORAGE_KEY = "darkTextColor";
export const LIGHT_TEXT_COLOR_STORAGE_KEY = "lightTextColor";
export const IS_AUTO_TEXT_COLOR_STORAGE_KEY = "isAutoTextColor";
export const BG_TYPE_STORAGE_KEY = "bgType";

export type CardStyle = "light" | "dark" | "neutral";

export function storeDarkBackgroundColor(color: string) {
  browser.storage.local.set({ [DARK_BACKGROUND_COLOR_STORAGE_KEY]: color });
}

export function storeLightBackgroundColor(color: string) {
  browser.storage.local.set({ [LIGHT_BACKGROUND_COLOR_STORAGE_KEY]: color });
}

export function storeDarkTextColor(color: string) {
  browser.storage.local.set({ [DARK_TEXT_COLOR_STORAGE_KEY]: color });
}

export function storeLightTextColor(color: string) {
  browser.storage.local.set({ [LIGHT_TEXT_COLOR_STORAGE_KEY]: color });
}

export function storeIsAutoTextColor(isAuto: boolean) {
  browser.storage.local.set({ [IS_AUTO_TEXT_COLOR_STORAGE_KEY]: isAuto });
}

export function storeBgType(bgType: string) {
  browser.storage.local.set({ [BG_TYPE_STORAGE_KEY]: bgType });
}

export function storeCardStyle(style: CardStyle) {
  browser.storage.local.set({ [CARD_STYLE_STORAGE_KEY]: style });
}
