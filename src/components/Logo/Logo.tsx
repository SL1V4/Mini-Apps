import '@/components/Logo/Logo.scss';
import logo from '@/components/Logo/img/logo.svg';
import { dir } from 'console';

const Logo = ({ url }: { url: string }) => {
  return (
    <a href={url} className="logo">
      <img src={logo.src} alt="logo" />

      <span>Simonenko Slava</span>
    </a>
  );
};

export default Logo;
