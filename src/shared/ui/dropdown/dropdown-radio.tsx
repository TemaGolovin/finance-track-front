import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/lib';

interface DropdownRadioProps<IdType> {
  selectedId: IdType;
  trigger: React.ReactNode;
  list: { id: IdType; label: string }[];
  onSelect: (id: IdType) => void;
}

export const DropdownRadio = <IdType extends string>({
  list,
  onSelect,
  trigger,
  selectedId,
}: DropdownRadioProps<IdType>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={selectedId}
          onValueChange={(newSelectedId) => onSelect(newSelectedId as IdType)}
        >
          {list.map(({ id, label }) => (
            <DropdownMenuRadioItem key={id} value={id}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
