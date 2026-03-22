import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { LoginAction } from './login-action';
import { MainLogoAction } from './main-logo';
import { Sidebar } from '@/widget/sidebar';
import { InvitationAction } from './invitation-action';

export const Header = async () => {
  return (
    <header className="bg-base-300 py-0.5 bg-linear-to-b from-secondary/60 to-secondary/33">
      <div className="container mx-auto px-2 sm:px-0 flex justify-between items-center">
        <div className="flex gap-2">
          <Sidebar />
          <MainLogoAction />
        </div>

        <div className="flex gap-2">
          <ThemeSwitcher btnClassName="bg-linear-to-t from-secondary/60 to-background/70" />
          <I18nSwitcher btnClassName="bg-linear-to-t from-secondary/60 to-background/70" />
          <LoginAction />
          <InvitationAction />
        </div>
      </div>
    </header>
  );
};
