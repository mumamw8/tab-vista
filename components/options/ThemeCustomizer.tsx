import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Palette } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import ColorPicker from "./ColorPicker";
import PresetColors from "./PresetColors";

const ThemeCustomizer: React.FC = () => {
  const { theme, backgroundColor } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const textColor = theme.text.color;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--customizer-bg-color",
      `${backgroundColor}10`
    );
  }, [backgroundColor]);

  return (
    <div
      className="w-80 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out shadow-xl flex flex-col gap-4"
      style={{
        backgroundColor: `var(--customizer-bg-color)`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transform: isOpen ? "translateY(0)" : "translateY(calc(100% - 48px))",
        maxHeight: isOpen ? "80vh" : "48px",
      }}
    >
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: textColor }}
      >
        <div className="flex items-center gap-2">
          <Palette size={18} />
          <h2 className="font-medium">Theme Settings</h2>
        </div>
        <button
          aria-label={isOpen ? "Collapse panel" : "Expand panel"}
          className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
        >
          {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(80vh-48px)]">
        <ColorPicker />
        <div
          className="h-px my-4"
          style={{ backgroundColor: `${textColor}20` }}
        ></div>
        <PresetColors />
      </div>
    </div>
  );
};

export default ThemeCustomizer;
