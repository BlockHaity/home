// 解析YAML front matter
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (match) {
        const frontMatter = match[1];
        const markdownContent = match[2];

        // 解析简单的YAML属性
        const properties = {};
        frontMatter.split('\n').forEach(line => {
            const [key, value] = line.split(':').map(part => part.trim());
            if (key && value) {
                properties[key] = value;
            }
        });

        return {
            properties,
            content: markdownContent
        };
    }

    // 如果没有front matter，返回原始内容
    return {
        properties: {},
        content: content
    };
}

// 创建单个卡片的开关控制
function createCardToggle(title, cardId) {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'card-toggle';
    toggleContainer.innerHTML = `
        <input type="checkbox" id="toggle-${cardId}" class="toggle-checkbox" checked>
        <label for="toggle-${cardId}" class="toggle-label">
            <span class="toggle-text">${title}</span>
            <span class="toggle-indicator"></span>
        </label>
    `;
    
    return toggleContainer;
}

// 处理HTML内容中的样式和脚本
function processHtmlContent(htmlContent, cardId) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // 处理样式标签
    const styles = tempDiv.querySelectorAll('style');
    styles.forEach(style => {
        const styleElement = document.createElement('style');
        styleElement.textContent = style.textContent;
        document.head.appendChild(styleElement);
        style.remove();
    });

    // 处理脚本标签
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        if (script.src) {
            scriptElement.src = script.src;
        } else {
            scriptElement.textContent = script.textContent;
        }
        document.body.appendChild(scriptElement);
        script.remove();
    });

    return tempDiv.innerHTML;
}

// 从服务器获取Markdown文件列表
async function loadMarkdownFiles() {
    // 获取瀑布流容器和卡片列表容器
    const waterfall = document.getElementById('right-panel');
    const cardList = document.getElementById('card-list');

    try {
        console.log('开始加载Markdown文件...');

        // 修改API端点为 root.json
        const response = await fetch('/markdown/newtab.json');

        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }

        const fileMap = await response.json();
        console.log('获取到的文件映射:', fileMap);

        if (!fileMap || Object.keys(fileMap).length === 0) {
            console.warn('没有找到Markdown文件');
            waterfall.innerHTML = '<div class="card"><p>暂无内容</p></div>';
            cardList.innerHTML = '<p>暂无卡片</p>';
            return;
        }

        // 遍历文件映射对象
        let cardCount = 0;
        for (const [title, filePath] of Object.entries(fileMap)) {
            try {
                console.log(`正在加载文件: ${title} -> ${filePath}`);
                const fileResponse = await fetch(filePath);

                if (!fileResponse.ok) {
                    console.warn(`文件 ${filePath} 加载失败: ${fileResponse.status}`);
                    continue;
                }

                const rawContent = await fileResponse.text();
                console.log(`文件 ${title} 内容长度:`, rawContent.length);

                // 解析front matter和内容
                const { properties, content } = parseFrontMatter(rawContent);
                console.log(`解析到的属性:`, properties);

                // 创建卡片ID
                const cardId = `card-${cardCount++}`;

                // 创建卡片开关并添加到卡片列表
                const cardToggle = createCardToggle(title, cardId);
                cardList.appendChild(cardToggle);

                // 创建卡片内容
                const card = document.createElement('div');
                card.className = 'waterfall-card';
                card.id = cardId;

                // 应用front matter中的width属性
                if (properties.width) {
                    if (properties.width === 'auto') {
                        card.style.width = 'auto';
                    } else if (properties.width === 'full') {
                        card.style.width = '100%';
                    } else {
                        card.style.width = properties.width;
                    }
                }

                // 根据文件扩展名处理内容
                const isHtml = filePath.toLowerCase().endsWith('.html');
                let processedContent = isHtml ? processHtmlContent(content, cardId) : marked.parse(content);

                // 设置卡片内容
                card.innerHTML = `
                    <div class="card">
                            ${processedContent}
                    </div>
                `;

                // 将卡片添加到瀑布流
                waterfall.appendChild(card);

                // 添加开关事件监听
                const toggleCheckbox = cardToggle.querySelector('.toggle-checkbox');
                toggleCheckbox.addEventListener('change', function () {
                    if (this.checked) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

            } catch (fileError) {
                console.error(`加载文件 ${title} 失败:`, fileError);
            }
        }

        // 检查是否成功创建了卡片
        const cards = document.querySelectorAll('.waterfall-card');
        console.log(`成功创建了 ${cards.length} 个卡片`);

    } catch (error) {
        console.error('加载Markdown文件失败:', error);
        // 显示错误信息
        waterfall.innerHTML = `
            <div class="card">
                <h3>加载失败</h3>
                <p>无法加载内容，请稍后重试。</p>
                <p>错误信息: ${error.message}</p>
            </div>
        `;
        cardList.innerHTML = '<p>加载卡片列表失败</p>';
    }
}

// 页面加载完成后加载Markdown文件
window.addEventListener('DOMContentLoaded', loadMarkdownFiles);

