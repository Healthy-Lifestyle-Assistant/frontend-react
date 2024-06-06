import '../styles/blocks/PaginationBullets.scss';
import classNames from 'classnames';

export const PaginationBullets = ({
  visibleBullets,
  currentPage,
  onClick,
}) => {
  return (
    <section className="PaginationBullets">
      {visibleBullets.map((bullet) => (
        <button 
          key={bullet}
          className={classNames(
            'PaginationBullets_bullet',
            { 'PaginationBullets_bullet-active': bullet === currentPage }
          )}
          onClick={() => onClick(bullet)}
        >
          {bullet}
        </button>
      ))}
    </section>
  );
};