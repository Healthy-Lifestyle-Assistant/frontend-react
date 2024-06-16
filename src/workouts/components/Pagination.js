import { useCallback } from 'react';
import '../styles/blocks/Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { PaginationButton } from './PaginationButton';
import { PaginationBullets } from './PaginationBullets';
import { updateSearchParams } from '../utils/updateSearchParams';

export const Pagination = ({ quantity }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('pageNumber') || '1');
  const pageSize = Number(searchParams.get('pageSize') || '5');
  const quantityPages = Math.ceil(quantity / pageSize);

  const onPageChange = useCallback((pageNumber) => {
    updateSearchParams(searchParams, setSearchParams, { pageNumber });
  }, [searchParams, setSearchParams]);

  const getBulletTitles = useCallback((quantity) => {
    const visibleBullets = [];

    for (let i = 0; i < quantity; i++) {
      visibleBullets.push(i + 1);
    }

    return visibleBullets;
  }, []);

  const getVisibleBullets = useCallback((
    currentPage, 
    allVisibleBullets,
  ) => {
    const visibleBullets = [...allVisibleBullets];

    if (currentPage <= 3) {
      return visibleBullets.splice(0, 4);
    }

    if (currentPage > visibleBullets[visibleBullets.length - 4]) {
      return visibleBullets.slice(-4);
    }

    return visibleBullets.slice(currentPage - 2, currentPage + 2);
  }, []);

  const allVisibleBullets = getBulletTitles(quantityPages);

  const visibleBullets = getVisibleBullets(page, allVisibleBullets);

  return (
    <article className="Pagination">
      <PaginationButton
        totalPages={quantityPages}
        type={'prev'}
        currentPage={page}
        onClick={() => onPageChange(String(page - 1))}
      />
      <PaginationBullets
        visibleBullets={visibleBullets}
        currentPage={page}
        onClick={(bullet) => onPageChange(String(bullet))}
      />
      <PaginationButton
        totalPages={quantityPages}
        type={'next'}
        currentPage={page}
        onClick={() => onPageChange(String(page + 1))}
      />
    </article>
  );
};