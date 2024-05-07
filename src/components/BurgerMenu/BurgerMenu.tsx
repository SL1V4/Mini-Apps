import { useState } from 'react';
import Menu from '@/components/Menu/Menu';
import Logo from '@/components/Logo/Logo';
import '@/components/BurgerMenu/BurgerMenu.scss';

export default function BurgerMenu() {
  const [isActive, setActtive] = useState(false);

  function open() {
    document.body.classList.add('overflow__hidden');
    setActtive(true);
  }

  function close() {
    document.body.classList.remove('overflow__hidden');
    setActtive(false);
  }

  return (
    <>
      <button className="burger__btn" onClick={open}>
        <span></span>
      </button>

      <div className={'burger__menu' + (isActive ? ' active' : '')}>
        <div className="overlay" onClick={close}></div>

        <div className="burger__menu_content">
          <div className="close_btn" onClick={close}>
            <span></span>
          </div>

          <Logo url="/" />

          <Menu />
        </div>
      </div>
    </>
  );
}
