import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/lib';
import { Fragment, type FC, type ReactNode } from 'react';

interface DropdownProps<IdType> {
  trigger: ReactNode;
  list: {
    label: string;
    id: IdType;
    icon?: ReactNode;
    isBottomSeparator?: boolean;
    subList?: {
      label: string;
      id: IdType;
      isBottomSeparator?: boolean;
    }[];
  }[];
  onSelect: (id: IdType) => void;
  align?: 'center' | 'end' | 'start';
  label?: string;
}

export const Dropdown = <IdType extends string | number>({
  trigger,
  list,
  onSelect,
  label,
  align = 'center',
}: DropdownProps<IdType>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        <DropdownMenuGroup>
          {list.map((item) => (
            <Fragment key={item.id}>
              {!item?.subList && (
                <DropdownMenuItem onClick={() => onSelect(item.id)}>{item.label}</DropdownMenuItem>
              )}
              {item?.subList && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {item.subList.map((subItem) => (
                        <Fragment key={subItem.id}>
                          <DropdownMenuItem onClick={() => onSelect(subItem.id)}>
                            {subItem.label}
                          </DropdownMenuItem>
                          {subItem?.isBottomSeparator && <DropdownMenuSeparator />}
                        </Fragment>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
              {item?.isBottomSeparator && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
