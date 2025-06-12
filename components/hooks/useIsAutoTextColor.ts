import { useTheme } from "@/components/providers/ThemeProvider";

function useIsAutoTextColor() {
  const { isAutoTextColor, toggleIsAutoTextColor } = useTheme();

  return { isAutoTextColor, toggleIsAutoTextColor };
}

export default useIsAutoTextColor;
