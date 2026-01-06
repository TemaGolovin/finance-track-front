import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Check } from 'lucide-react';
import { Drawer } from '../drawer/drawer';
import { Button } from '@/shared/lib';
import { useTranslations } from 'next-intl';

export const CATEGORY_COLORS = [
  // Red
  '#EF5350',
  '#E53935',
  '#D32F2F',

  // Pink
  '#EC407A',
  '#D81B60',
  '#C2185B',

  // Orange
  '#FF7043',
  '#F4511E',
  '#E64A19',

  // Amber
  '#FFB300',
  '#FFA000',
  '#FF8F00',

  // Yellow
  '#FDD835',
  '#FBC02D',

  // Lime
  '#C0CA33',
  '#AFB42B',

  // Green
  '#66BB6A',
  '#43A047',
  '#388E3C',

  // Teal
  '#26A69A',
  '#00897B',
  '#00796B',

  // Cyan
  '#26C6DA',
  '#00ACC1',
  '#0097A7',

  // Blue
  '#42A5F5',
  '#1E88E5',
  '#1565C0',

  // Indigo
  '#5C6BC0',
  '#3F51B5',
  '#3949AB',

  // Purple
  '#7E57C2',
  '#673AB7',
  '#5E35B1',

  // Violet
  '#AB47BC',
  '#8E24AA',

  // Brown
  '#8D6E63',
  '#6D4C41',

  // Grey
  '#9E9E9E',
  '#757575',

  // Blue Grey / Dark
  '#546E7A',
  '#455A64',
  '#37474F',
];

interface ColorSelectorProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const categoryT = useTranslations('category');

  return (
    <Drawer
      title={categoryT('colorPicker')}
      trigger={
        <Button
          variant={'outline'}
          size={!selectedColor ? 'default' : 'icon'}
          className={!selectedColor ? 'w-full' : ''}
        >
          {selectedColor ? (
            <div className="h-4.5 w-4.5 rounded-full" style={{ background: selectedColor }} />
          ) : (
            categoryT('pickColor')
          )}
        </Button>
      }
      renderContent={(onClose) => (
        <div className="grid grid-cols-5 gap-y-3 justify-items-center">
          {CATEGORY_COLORS.map((color) => (
            <button
              onClick={() => {
                setSelectedColor(color);
                onClose();
              }}
              type="button"
              key={color}
              className={cn('h-10 w-10 rounded-full flex items-center justify-center', {
                'ring-2 ring-offset-1 ring-offset-background': selectedColor === color,
              })}
              style={{ background: color }}
            >
              {selectedColor === color && <Check className="text-foreground" />}
            </button>
          ))}
        </div>
      )}
    />
  );
};
