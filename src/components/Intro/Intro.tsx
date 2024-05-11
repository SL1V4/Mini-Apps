import { Container } from '@mui/material';
import Terminal from '@/components/Terminal/Terminal';
import MoreArrow from './img/show_more.svg';
import './Intro.scss';

export default function Intro() {
  return (
    <section className="intro">
      <Container>
        <div className="intro__section">
          <div>
            <h1 className="intro__title">Slava_Simonenko</h1>

            <h3 className="intro__suptitle">Web-developer</h3>
          </div>

          <Terminal />
        </div>
      </Container>

      <a href="#aboutSection" className="intro__arrow">
        <img src={MoreArrow.src} alt="arrow" />
      </a>
    </section>
  );
}
