import { memo } from 'react';
import '../styles/blocks/LinkLine.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import arrowRight from '../assets/icons/arrowRight.svg';

export const LinkLine = memo(({ links }) => {
  const capitalize = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <section className="LinkLine">
      {links.map(({ title, link }) => {
        const isInitialLink = links[0].title === title;
        return (
          <>
            {!isInitialLink && (
              <img
                src={arrowRight}
                alt="arrow"
                className="LinkLine__arrow"
              />
            )}
            <NavLink
              to={link}
              className={({ isActive }) => classNames(
                'LinkLine__link',
                { 'LinkLine__link--active': isActive }
              )}
              end
            >
              <p className="LinkLine__title">{capitalize(title || '')}</p>
            </NavLink>
          </>
        );
      })}
    </section>
  );
});