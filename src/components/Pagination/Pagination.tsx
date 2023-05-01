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
    const onArrow = (arrow: string) => {
        window.scrollTo(0, 0);
        switch(arrow) {
            case 'prev': setCurrentPage(currentPage - 1); break
            case 'next': setCurrentPage(currentPage + 1); break
        }
    }
    return (
        <div className='pagination'>
            <button 
                className='pagination__arrow pagination__arrow--prev' 
                onClick={() => onArrow('prev')}
                disabled={currentPage === 1}
                >
                    <img className='pagination__img' src={arrow} alt='previous' />
            </button>
            <ul className='pagination__nav'>
                {pages.map(page => {
                    const isActive = page === currentPage;
                    return (
                        <li 
                            key={page} 
                            className={isActive ?  'pagination__page-num pagination__page-num--active': 'pagination__page-num'} 
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
                onClick={() => onArrow('next')}
            >
                <img className='pagination__img' src={arrow} alt='previous' />
            </button>
        </div>
    )
}

export default Pagination;