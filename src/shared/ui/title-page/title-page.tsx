import { ArrowLeft } from 'lucide-react';
import { Button } from '../button/button';

interface TitlePageProps {
  title: string;
  onBackBtnClick?: () => void;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title, onBackBtnClick }) => {
  return (
    <div className="font-bold flex items-center gap-3 bg-secondary text-secondary-foreground/80 p-2 -mx-2 px-3">
      {onBackBtnClick && (
        <Button
          variant="ghost"
          size="icon"
          className="text-secondary-foreground"
          onClick={onBackBtnClick}
        >
          <ArrowLeft />
        </Button>
      )}
      <div>{title}</div>
    </div>
  );
};
