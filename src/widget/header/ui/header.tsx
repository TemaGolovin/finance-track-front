import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { LoginAction } from './login-action';
import { MainLogoAction } from './main-logo';
import { Sidebar } from '@/widget/sidebar';

export const Header = async () => {
  return (
    <header className="bg-base-300 py-0.5 bg-linear-to-b from-secondary/60 dark:from-secondary/50 to-secondary/33">
      <div className="container mx-auto px-2 sm:px-0 flex justify-between items-center">
        <div className="flex gap-2">
          <Sidebar />
          <MainLogoAction />
        </div>

        <div>
          <ThemeSwitcher />
          <I18nSwitcher />
          <LoginAction />
        </div>
      </div>
    </header>
  );
};
