import { useTheme } from "@/components/providers/ThemeProvider";

const useBackgroundColor = () => {
  const { backgroundColor, updateBackgroundColor } = useTheme();

  return {
    backgroundColor,
    updateBackgroundColor,
  };
};

export default useBackgroundColor;
