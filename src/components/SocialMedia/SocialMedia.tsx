import vk from './img/vk.svg';
import tg from './img/tg.svg';
import gh from './img/gitHub.svg';

import './SocialMedia.scss';

export default function SocialMedia() {
  return (
    <ul className="social">
      <li className="social__item">
        <a href="https://t.me/sl1va_XD" target="_blank" title="tg">
          <img src={tg.src} alt="td" />
        </a>
      </li>
      <li className="social__item">
        <a href="https://github.com/SL1V4" target="_blank" title="gh">
          <img src={gh.src} alt="gh" />
        </a>
      </li>
      <li className="social__item">
        <a href="https://vk.com/sl1va_xd" target="_blank" title="vk">
          <img src={vk.src} alt="vk" />
        </a>
      </li>
    </ul>
  );
}
