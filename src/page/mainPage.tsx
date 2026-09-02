import "../css/mainPage.css"

export const MainHPage = () => {
    return (
        <>
       <div className="mobile-container">
  <header className="search-header">
    <button className="icon-btn back-btn">‹</button>
    <div className="search-input-wrapper">
      <span className="search-icon">🔍</span>
      <input type="text" value="숑석" className="search-input" />
      <button className="clear-btn">✕</button>
    </div>
    <button className="icon-btn settings-btn">⚙️</button>
  </header>

  <nav className="category-tabs">
    <button className="tab">전체</button>
    <button className="tab active">그림</button>
    <button className="tab">소설</button>
  </nav>

  <div className="search-result-count">
    검색 결과 <span>3,200</span>개
  </div>

  <main className="post-list">
    <article className="post-card">
      <div className="author-header">
        <div className="author-info">
          <img src="https://via.placeholder.com/40" alt="프로필" className="avatar" />
          <div className="author-details">
            <span className="nickname">건달</span>
            <span className="meta">3시간 전 · 건달의꿈</span>
          </div>
        </div>
        <button className="subscribe-btn">구독</button>
      </div>

      <div className="post-content">
        <h2 className="title">타이틀</h2>
        <p className="preview-text">
        줄거리
        </p>
      </div>

      <div className="tag-list">
        <span className="tag tag-adult">성인</span>
        <span className="tag">숑석</span>
        <span className="tag">캠게</span>
      </div>

      <div className="post-stats">
        <span className="views">조회 54</span>
      </div>

      <div className="interaction-bar">
        <button className="action-btn">❤️ 11</button>
        <button className="action-btn">💬 2</button>
        <div className="right-actions">
          <a href="https://postype.com" target="_blank" rel="noopener noreferrer" className="action-btn postype-link-btn">
                포스타입으로 이동
        </a>
        </div>
      </div>
    </article>
  </main>
</div>
</>
    )
}

export default MainHPage;