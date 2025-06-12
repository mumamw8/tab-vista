import { useTheme } from "@/components/providers/ThemeProvider";

function useCardStyle() {
  const { cardStyle, updateCardStyle } = useTheme();

  return { cardStyle, updateCardStyle };
}

// export { CardStyle };
export default useCardStyle;
