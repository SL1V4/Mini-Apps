import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import Menu from '@/components/Menu/Menu';
import '@/components/ResponsiveMenu/ResponsiveMenu.scss';

export default function ResponsiveMenu() {
  return (
    <div className="header__menu">
      <Menu />
      <BurgerMenu />
    </div>
  );
}
