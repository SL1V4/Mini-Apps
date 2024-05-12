import { Container, Grid } from '@mui/material';
import me from './img/me.webp';
import './AboutSection.scss';

const stackList: string[] = [
  'JavaScript',
  'Next.js',
  'React',
  'TypeScript',
  'PHP',
  'HTML',
  'CSS',
  'Git',
  'GitHub',
  'ES6',
  'Bootstrap',
  'SCSS',
  'Figma',
];

export default function AboutSection() {
  return (
    <section className="about" id="aboutSection">
      <Container>
        <div className="about__section">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className="about__img">
                <img src={me.src} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className="about__content">
                <div className="about__content_block">
                  <h3 className="about__title">Навыки:</h3>
                  <div className="stack__list">
                    {stackList.map((item: string) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className="about__content_block">
                  <h3 className="about__title">
                    Желаемая должность и зарплата:
                  </h3>
                  <div>
                    Frontend Developer (React, TypeScript, JavaScript, Next.js)
                  </div>
                  <div>150 000 ₽</div>
                </div>

                <div className="about__content_block">
                  <h3 className="about__title">Опыт работы:</h3>
                  <div>3.5 года (подробнее ниже)</div>
                </div>

                <div className="about__content_block">
                  <h3 className="about__title">О себе:</h3>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consequuntur quos odit vitae officiis vel id quaerat,
                    dolorem saepe recusandae similique ad magni perspiciatis
                    eveniet. Esse voluptates molestias repudiandae atque
                    nostrum? Possimus eius exercitationem qui velit optio? Harum
                    reiciendis dolorem delectus sint ab inventore quaerat vero
                    pariatur expedita. Ipsum deleniti quisquam a fuga! Iusto,
                    illum a atque ab quia aliquam earum? Ipsa eum quisquam
                    quidem minus facilis earum, ullam eos odio natus iste quod
                    assumenda quasi similique doloremque corrupti nobis error,
                    possimus ipsum facere iure? Iste reiciendis qui itaque
                    deserunt officia!
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}
