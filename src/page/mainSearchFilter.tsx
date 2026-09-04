import React, { useState } from 'react';
import "../css/mainPage.css";
import type { MainSearchFilterProps } from '../interface/type';

const MEMBERS = ['숕', '석', '돌', '은', '숑', '넨', '히', '또', '톤', '왼', '른'];

export const MainSearchFilter: React.FC<MainSearchFilterProps> = ({
  selectedTags,
  setSelectedTags,
  searchTerm,
  setSearchTerm
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [firstPick, setFirstPick] = useState<string>('');

  // 칩 클릭 핸들러
  const handleChipClick = (item: string) => {
    if (!firstPick) {
      setFirstPick(item);
      return;
    }

    if (firstPick === item) {
      setFirstPick('');
      return;
    }

    const newTag = `${firstPick}${item}`;
    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prev) => [...prev, newTag]);
    }

    setFirstPick('');
  };

  // 특정 태그 삭제
  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  // 전체 초기화
  const handleReset = () => {
    setSelectedTags([]);
    setFirstPick('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-section">
      <div className="search-bar-wrapper">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input 
            onChange={handleSearchChange} 
            value={searchTerm} 
            type="text" 
            placeholder="검색어를 입력하세요" 
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>✕</button>
          )}
        </div>
        
        <button 
          className={`filter-toggle-btn ${isFilterOpen || selectedTags.length > 0 ? 'active' : ''}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="태그 필터"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>

      {isFilterOpen && (
        <div className="tag-filter-container">
          <div className="tag-filter-header">
            <span>
              태그 조합 {firstPick ? <b className="guide-text">(두 번째 '른' 선택 중...)</b> : '(첫 번째 왼 선택)'}
            </span>
            {(selectedTags.length > 0 || firstPick) && (
              <button className="reset-btn" onClick={handleReset}>초기화</button>
            )}
          </div>

          <div className="tag-chip-group">
            {MEMBERS.map((item) => {
              const isFirstSelected = firstPick === item;
              return (
                <button
                  key={item}
                  className={`tag-chip ${isFirstSelected ? 'selected-first' : ''}`}
                  onClick={() => handleChipClick(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {selectedTags.length > 0 && (
            <div className="selected-tags-display">
              <span className="selected-title">적용된 태그:</span>
              <div className="selected-chip-group">
                {selectedTags.map((tag) => (
                  <span key={tag} className="active-tag-badge">
                    #{tag}
                    <button className="remove-tag-btn" onClick={() => removeTag(tag)}>✕</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSearchFilter;