import { useState, useEffect } from 'react';
import "../css/mainPage.css";
import MainSearchFilter from './mainSearchFilter';
import { useFilterHook } from '../hook/filterHook';

export const MainHPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'webtoon' | 'novel'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'likes' | 'views'>('latest');

  // 스크롤 방향 상태 ('top': 위로 이동 / 'bottom': 아래로 이동)
  const [scrollDirection, setScrollDirection] = useState<'top' | 'bottom'>('bottom');

  const ITEMS_PER_PAGE = 20;
  const PAGE_BLOCK_SIZE = 5;

  const filteredPosts = useFilterHook(selectedTags);

  // 스크롤 위치 감지 (300px 기준으로 버튼 방향 전환)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollDirection('top');
      } else {
        setScrollDirection('bottom');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 맨 위 또는 맨 아래로 이동하는 함수
  const handleScrollTo = () => {
    if (scrollDirection === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const categoryFilteredPosts = filteredPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, selectedCategory]);

  const getPostDate = (date: string): number => {
    const koreanDate = date.match(/^(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (koreanDate) {
      const [, year, month, day] = koreanDate;
      return Date.UTC(Number(year), Number(month) - 1, Number(day));
    }

    const parsedDate = Date.parse(date);
    return Number.isNaN(parsedDate) ? 0 : parsedDate;
  };

  const sortedPosts = [...categoryFilteredPosts].sort((a, b) => {
    if (sortOption === 'latest') {
      return getPostDate(b.date) - getPostDate(a.date);
    }
    if (sortOption === 'oldest') {
      return getPostDate(a.date) - getPostDate(b.date);
    }
    if (sortOption === 'likes') {
      return Number(b.likes ?? 0) - Number(a.likes ?? 0);
    }
    if (sortOption === 'views') {
      return Number(b.views ?? 0) - Number(a.views ?? 0);
    }
    return 0;
  });

  const totalItems = sortedPosts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const currentGroup = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE);
  const startPage = currentGroup * PAGE_BLOCK_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK_SIZE - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const formatNumber = (numStr: string | number): string => {
    const num = Number(numStr);
    if (isNaN(num)) return '0';
    if (num >= 10000) {
      const man = num / 10000;
      return `${Number(man.toFixed(1))}만`;
    }
    if (num >= 1000) {
      const cheon = num / 1000;
      return `${Number(cheon.toFixed(1))}천`;
    }
    return num.toString();
  };

  return (
    <div className="mobile-container">
      <MainSearchFilter 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags} 
      />

      <nav className="category-tabs">
        <button 
          className={`tab ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          전체
        </button>
        <button 
          className={`tab ${selectedCategory === 'webtoon' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('webtoon')}
        >
          그림
        </button>
        <button 
          className={`tab ${selectedCategory === 'novel' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('novel')}
        >
          소설
        </button>
      </nav>

      <div className="search-result-bar">
        <div className="search-result-count">
          검색 결과 <span>{totalItems.toLocaleString()}</span>개
        </div>
        <div className="sort-select-wrapper">
          <select 
            value={sortOption} 
            onChange={(e) => {
              setSortOption(e.target.value as any);
              setCurrentPage(1);
            }}
            className="sort-select"
          >
            <option value="latest">최신순</option>
            <option value="likes">좋아요순</option>
            <option value="views">조회수순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div style={{ padding: '0 16px', fontSize: '12px', color: '#666' }}>
          선택된 필터: {selectedTags.map(tag => `#${tag}`).join(', ')}
        </div>
      )}

      <main className="post-list">
        {currentPosts.map((post) => (
          <article key={post.url} className="post-card">
            <div className="author-header">
              <div className="author-info">
                <div className="author-details">
                  <h2 className="title">{post.title}</h2>
                  <span className="nickname">{post.author}  ·  {post.date}</span>
                </div>
              </div>
            </div>

            <div className="post-content">
              <p className="preview-text">{post.summary}</p>
            </div>

            <div className="tag-list">
              {post.is_adult === 'True' && <span className="tag tag-adult">성인</span>}
              {post.cpName?.map((cp, index) => (
                  <span key={`${post.url}-${index}`} className="tag">{cp}</span>
              ))}
            </div>

            <div className="post-stats">
              <span className="views">조회 {formatNumber(post.views)}</span>
            </div>

            <div className="interaction-bar">
              <button className="action-btn">❤️ {formatNumber(post.likes)}</button>
              <button className="action-btn">💰 {Number(post.price).toLocaleString()}P</button>
              <div className="right-actions">
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn postype-link-btn"
                >
                  포스타입으로 이동
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className="page-nav-btn" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            &lt;&lt;
          </button>

          <button 
            className="page-nav-btn" 
            disabled={startPage === 1}
            onClick={() => handlePageChange(startPage - 1)}
          >
            &lt;
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`page-number-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button 
            className="page-nav-btn" 
            disabled={endPage === totalPages}
            onClick={() => handlePageChange(endPage + 1)}
          >
            &gt;
          </button>

          <button 
            className="page-nav-btn" 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            &gt;&gt;
          </button>
        </div>
      )}

      {/* 스크롤 위치에 따라 ▲ / ▼ 토글되는 플로팅 버튼 */}
      <button 
        className="scroll-top-btn" 
        onClick={handleScrollTo}
        aria-label={scrollDirection === 'top' ? '맨 위로 이동' : '맨 아래로 이동'}
      >
       <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {scrollDirection === 'top' ? (
          <path d="M18 15l-6-6-6 6" /> 
        ) : (
          <path d="M6 9l6 6 6-6" />  
        )}
      </svg>
      </button>
    </div>
  );
};

export default MainHPage;