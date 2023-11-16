import "./Techs.css";

const techsData = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB"
];

function Techs() {
  return (
    <section className="technologies" id="technologies">
      <h2 className="technologies__name">Технологии</h2>
      <h3 className="technologies__title">7 технологий</h3>
      <p className="technologies__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="technologies__list">
        {techsData.map((tech, index) => (
          <li key={index} className="technologies__item">
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Techs;