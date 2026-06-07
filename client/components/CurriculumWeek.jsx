import React from 'react';

const WEEKS = [
  { number: 1, title: 'HTML', icon: 'fa-brands fa-html5', items: ['Intro to HTML', 'HTML Tags', 'HTML Attributes'] },
  { number: 2, title: 'CSS', icon: 'fa-brands fa-css3-alt', items: ['CSS Selectors', 'Flexbox', 'Grid Layout'] },
  { number: 3, title: 'Javascript', icon: 'fa-brands fa-js', items: ['Variables', 'Functions', 'DOM Manipulation'] },
  { number: 4, title: 'React', icon: 'fa-brands fa-react', items: ['Components', 'Props & State', 'React Hooks'] },
  { number: 5, title: 'Intermediate React', icon: 'fa-brands fa-react', items: ['React Routing', 'Context API', 'Custom Hooks'] },
];

export default function CurriculumWeek() {
  return (
    <section className="curriculum">
      <h2>Course Curriculum</h2>
      <div className="curriculum__weeks">
        {WEEKS.map((week) => (
          <details key={week.number} open>
            <summary className="summary_tag">
              <i className={week.icon} /> Week {week.number}
            </summary>
            <h3 className="week_summary">{week.title}</h3>
            <ul>
              {week.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
