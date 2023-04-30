import { FC } from 'react';
import arrow from '../../assets/img/arrow.svg';
import './Pagination.scss';

interface PaginationProps {
    pages: number[];
    currentPage: number;
    setCurrentPage: (page: number) => void
    onNav: (page: number) => void;
}

const Pagination:FC<PaginationProps> = ({ pages, currentPage, setCurrentPage, onNav}) => {
    return (
        <div className='pagination'>
            <button 
                className='pagination__arrow pagination__arrow--prev' 
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                >
                    <img className='pagination__img' src={arrow} alt='previous' />
            </button>
            <ul className='categories-page__nav'>
                {pages.map(page => {
                    const isActive = page === currentPage;
                    return (
                        <li 
                            key={page} 
                            className={isActive ?  'categories-page__page-num categories-page__page-num--active': 'categories-page__page-num'} 
                            onClick={() => onNav(page)}
                        >
                            {page}
                        </li>
                    )
                })}
            </ul>
            <button 
                disabled={currentPage === pages.length}
                className={`pagination__arrow pagination__arrow--next`} 
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <img className='pagination__img' src={arrow} alt='previous' />
            </button>
        </div>
    )
}

export default Pagination;