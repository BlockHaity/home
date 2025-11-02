// 获取搜索框元素
const searchInput = document.querySelector('.search-box input');

// 添加键盘事件监听器
searchInput.addEventListener('keypress', function(event) {
    // 检查是否按下了回车键（keyCode 13）
    if (event.key === 'Enter' || event.keyCode === 13) {
        // 获取搜索关键词并去除首尾空格
        const searchTerm = this.value.trim();
        
        // 如果搜索词不为空
        if (searchTerm) {
            // 构建Bing搜索URL，使用encodeURIComponent确保特殊字符被正确编码
            const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
            // 在新标签页打开搜索结果
            window.open(bingSearchUrl);
        }
    }
});
