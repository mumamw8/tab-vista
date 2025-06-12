import { useTheme } from "@/components/providers/ThemeProvider";

const useTextColor = () => {
  const { textColor, updateTextColor } = useTheme();

  return { textColor, updateTextColor };
};

export default useTextColor;
