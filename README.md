# Tab Vista

Tab Vista is a browser extension that transforms your new tab page into a customizable dashboard, displaying your bookmarks, reading list, and site suggestions—all in one place.

## Features

- **Bookmarks**: Browse and manage your bookmarks in a user-friendly interface. Hide or show specific bookmark folders.
- **Reading List**: Quickly access and manage your reading list, with options to filter unread items.
- **Site Suggestions**: Get suggestions based on your recent browsing history (most-visited or frequently-typed sites).
- **Customization**: Personalize the look and feel with theme and wallpaper options.
- **Settings**: Control the visibility of each section and fine-tune your experience via an options page.

## Tech Stack

- React (with WXT for browser extension development)
- TailwindCSS and DaisyUI for styling
- TypeScript for type safety
- Browser APIs: Bookmarks, Reading List, History, Storage

## Getting Started

### Installation

1. **Install dependencies**:
   ```sh
   pnpm install
   ```
2. **Start development server**:
   ```sh
   pnpm dev
   ```
   - For Firefox: `pnpm dev:firefox`
3. **Build for production**:
   ```sh
   pnpm build
   ```
   - For Firefox: `pnpm build:firefox`
4. **Package extension**:
   ```sh
   pnpm zip
   ```
   - For Firefox: `pnpm zip:firefox`
5. **Load the extension**:
   - Chrome: Load the `dist/` directory as an unpacked extension.
   - Firefox: Load the generated zip or `dist/` as a temporary add-on.

### File Structure

- `entrypoints/newtab/`: Main new tab UI (React)
- `entrypoints/options/`: Options/settings page
- `entrypoints/background.ts`: Background logic (e.g., reading list updates)
- `components/`: Reusable UI components (Bookmarks, Reading List, Suggestions, etc.)
- `public/icon/`: Extension icons
- `public/wallpapers/`: Optional wallpapers

### Permissions

The extension requests the following permissions:
- `bookmarks`
- `storage`
- `favicon`
- `readingList`
- `history`

## Customization

- **Theme**: Change colors and card styles in the options page.
- **Wallpaper**: Enable/disable and select wallpapers.
- **Section Visibility**: Show/hide bookmarks, reading list, and suggestions.

## Feedback

For issues or feedback, use the options page link or open an issue in this repository.
