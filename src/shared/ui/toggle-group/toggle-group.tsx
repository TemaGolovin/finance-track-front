import {
  ToggleGroupItem,
  ToggleGroup as ToggleGroupShadcn,
} from '@/shared/lib/shadcn/toggle-group';

interface ToggleGroupProps {
  items: {
    content: React.ReactNode;
    id: string;
    ariaLabel: string;
  }[];
  onClick: (id: string) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ items, onClick }) => {
  return (
    <ToggleGroupShadcn type="single" spacing={1}>
      {items.map((item) => (
        <ToggleGroupItem
          key={item.id}
          value={item.id}
          aria-label={item.ariaLabel}
          onClick={() => onClick(item.id)}
          className="data-[state=on]:bg-primary/20 dark:data-[state=on]:bg-primary/10 border border-solid border-transparent data-[state=on]:border-primary/50"
        >
          {item.content}
        </ToggleGroupItem>
      ))}
    </ToggleGroupShadcn>
  );
};
