import { useTheme } from "@/components/providers/ThemeProvider";

function useSystemTheme(): "light" | "dark" {
  const { systemTheme } = useTheme();
  return systemTheme;
}

export default useSystemTheme;
