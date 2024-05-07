'use client';
import Logo from '@/components/Logo/Logo';
import ResponsiveMenu from '@/components/ResponsiveMenu/ResponsiveMenu';
import Container from '@mui/material/Container';
import '@/components/Header/Header.scss';

export default function Header() {
  return (
    <header>
      <Container>
        <div className="header__content">
          <Logo url="/" />

          <ResponsiveMenu />
        </div>
      </Container>
    </header>
  );
}
