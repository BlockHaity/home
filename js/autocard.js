// 获取瀑布流容器
const waterfall = document.getElementById('waterfall');

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

// 从服务器获取Markdown文件列表
async function loadMarkdownFiles() {
    try {
        console.log('开始加载Markdown文件...');

        // 修改API端点为 root.json
        const response = await fetch('/markdown/root.json');

        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }

        const fileMap = await response.json();
        console.log('获取到的文件映射:', fileMap);

        if (!fileMap || Object.keys(fileMap).length === 0) {
            console.warn('没有找到Markdown文件');
            waterfall.innerHTML = '<div class="waterfall-card"><div class="waterfall-card-content"><p>暂无内容</p></div></div>';
            return;
        }

        // 遍历文件映射对象
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

                // 创建瀑布流卡片，使用title作为卡片标题
                const card = document.createElement('div');
                card.className = 'waterfall-card';

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

                // 设置卡片内容
                card.innerHTML = `
                        <div class="waterfall-card-content">
                            <h3>${title}</h3>
                            ${marked.parse(content)}
                        </div>
                    `;

                // 将卡片添加到瀑布流容器
                waterfall.appendChild(card);

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
                <div class="waterfall-card">
                    <div class="waterfall-card-content">
                        <h3>加载失败</h3>
                        <p>无法加载内容，请稍后重试。</p>
                        <p>错误信息: ${error.message}</p>
                    </div>
                </div>
            `;
    }
}

// 页面加载完成后加载Markdown文件
window.addEventListener('DOMContentLoaded', loadMarkdownFiles);