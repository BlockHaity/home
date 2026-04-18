import { useState, useEffect } from 'react';
import './search.css';

// WMC
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/divider/divider";

function Search() {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  // 保存搜索历史到本地存储
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // 添加到搜索历史
      setSearchHistory(prev => {
        const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 5);
        return newHistory;
      });
      // 跳转到 Bing 搜索
      window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, '_blank');
      setShowHistory(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setQuery(item);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="search-card">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <i className="bing-icon"></i>
            <md-outlined-text-field
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              placeholder="搜索..."
              className="search-input"
            ></md-outlined-text-field>
          </div>
          <md-filled-button type="submit" className="search-button">
            搜索
          </md-filled-button>
        </form>
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <h4>搜索历史</h4>
              <md-text-button
                onClick={clearHistory}
                className="clear-history"
                style={{ '--md-text-button-label-text-color': '#a9c7ff', '--md-text-button-hover-label-text-color': '#d6e3ff' }}
              >
                清除
              </md-text-button>
            </div>
            <md-list className="history-list" style={{ backgroundColor: 'transparent', color: '#e2e2e9' }}>
              {searchHistory.map((item, index) => (
                <>
                  {index > 0 && <md-divider style={{ '--md-divider-color': 'rgba(142, 144, 153, 0.5)' }}></md-divider>}
                  <md-list-item
                    onClick={() => handleHistoryItemClick(item)}
                    className="history-item"
                    style={{ '--md-list-item-container-color': 'transparent', '--md-list-item-label-text-color': '#e2e2e9', '--md-list-item-hover-container-color': 'rgba(41, 44, 49, 0.8)' }}
                  >
                    {item}
                  </md-list-item>
                </>
              ))}
            </md-list>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;