import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

export interface ColorOption {
  gradient: string;
  name?: string;
}

export interface ColorSelectorProps extends HTMLAttributes<HTMLDivElement> {
  options: ColorOption[];
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (gradient: string) => void;
}

const ColorSelector = forwardRef<HTMLDivElement, ColorSelectorProps>(
  ({ options, value, onValueChange, className, ...props }, ref) => {
    const handleColorSelect = (gradient: string) => {
      onValueChange?.(gradient);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-5 gap-3 sm:grid-cols-2 md:grid-cols-4",
          className,
        )}
        {...props}
      >
        {options.map((color) => (
          <div
            key={color.gradient}
            className={cn(
              "flex cursor-pointer flex-col overflow-hidden rounded-none transition-colors duration-200 ease-in-out select-none",
              "border border-zinc-200",
              "hover:border-zinc-300",
              value === color.gradient &&
                "border-2 border-zinc-500",
            )}
            onClick={() => handleColorSelect(color.gradient)}
            title={color.name ?? color.gradient}
          >
            <div className={cn(color.gradient, "h-6 w-full")} />
            <div className="flex flex-col p-2 text-sm font-medium">
              <p>{color.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
ColorSelector.displayName = "ColorSelector";

export { ColorSelector };
