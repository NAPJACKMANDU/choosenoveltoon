import { useState, useEffect } from 'react';
import "../css/mainPage.css";
import MainSearchFilter from './mainSearchFilter';
import { useFilterHook } from '../hook/filterHook';

export const MainHPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // 1. 카테고리 상태 추가 ('all' | 'webtoon' | 'novel')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'webtoon' | 'novel'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'likes' | 'views'>('latest');

  const ITEMS_PER_PAGE = 20;
  const PAGE_BLOCK_SIZE = 5;

  const filteredPosts = useFilterHook(selectedTags);

  // 2. 카테고리 필터링 적용
  const categoryFilteredPosts = filteredPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  // 태그나 카테고리가 바뀌면 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, selectedCategory]);

  // 3. 정렬 로직 적용
  const sortedPosts = [...categoryFilteredPosts].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortOption === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortOption === 'likes') {
      return Number(b.likes ?? 0) - Number(a.likes ?? 0);
    }
    if (sortOption === 'views') {
      return Number(b.views ?? 0) - Number(a.views ?? 0);
    }
    return 0;
  });

  // 4. 정렬된 데이터 기준 페이지네이션 계산
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

      {/* 카테고리 탭 영역 */}
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

      {/* 검색 결과 개수 및 우측 정렬 옵션 드롭다운 */}
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

      {/* 포스트 리스트 */}
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

            {/* 포스트 통계 (조회수) */}
            <div className="post-stats">
              <span className="views">조회 {formatNumber(post.views)}</span>
            </div>

            {/* 하단 상호작용 바 (좋아요) */}
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

      {/* 페이지네이션 바 */}
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
    </div>
  );
};

export default MainHPage;