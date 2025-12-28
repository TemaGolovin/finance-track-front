import {
  ToggleGroupItem,
  ToggleGroup as ToggleGroupShadcn,
} from '@/shared/lib/shadcn/toggle-group';

interface ToggleGroupProps<IdType> {
  items: {
    content: React.ReactNode;
    id: IdType;
    ariaLabel: string;
  }[];
  onClick: (id: IdType) => void;
  selectedId: IdType;
}

export const ToggleGroup = <IdType extends string>({
  items,
  onClick,
  selectedId,
}: ToggleGroupProps<IdType>) => {
  return (
    <ToggleGroupShadcn type="single" spacing={1} defaultValue={selectedId}>
      {items.map((item) => (
        <ToggleGroupItem
          key={item.id}
          value={item.id}
          aria-label={item.ariaLabel}
          onClick={() => onClick(item.id)}
          data-state={selectedId === item.id ? 'on' : 'off'}
          className="data-[state=on]:bg-primary/20 dark:data-[state=on]:bg-primary/10 border border-solid border-transparent data-[state=on]:border-primary/50"
        >
          {item.content}
        </ToggleGroupItem>
      ))}
    </ToggleGroupShadcn>
  );
};
