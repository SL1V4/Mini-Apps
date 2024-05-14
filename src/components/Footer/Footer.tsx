import Logo from '@/components/Logo/Logo';
import SocialMedia from '@/components/SocialMedia/SocialMedia';
import { Container, Grid } from '@mui/material';
import './Footer.scss';

export default function () {
  return (
    <footer>
      <Container className="footer__wrapper">
        <Logo url="/" />

        <div className="footer__social_block">
          <SocialMedia />
          <div className="copyright">
            <p>© {new Date().getFullYear()} Slava_Simonenko</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
