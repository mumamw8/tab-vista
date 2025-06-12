import { useTheme } from "@/components/providers/ThemeProvider";

const useBackgroundType = () => {
  const { bgType, updateBgType } = useTheme();

  return { bgType, updateBgType };
};

// export { BackgroundType };
export default useBackgroundType;
