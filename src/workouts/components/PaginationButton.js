import '../styles/blocks/PaginationButton.scss';
import classNames from 'classnames';
import arrowLeftIcon from '../assets/icons/arrowLeft.svg';
import arrowRightIcon from '../assets/icons/arrowRight.svg';

export const PaginationButton = ({
  totalPages,
  type,
  currentPage,
  onClick,
}) => {
  const isPrevious = type === 'prev';
  const isDisabled = isPrevious ? currentPage <= 1 : currentPage >= totalPages;

  return (
    <button 
      className={classNames(
        'PaginationButton',
        { 'PaginationButton-disabled': isDisabled }
      )}
      onClick={onClick}
    >
      <img src={isPrevious ? arrowLeftIcon : arrowRightIcon} alt="pagination-button" />
    </button>
  );
};