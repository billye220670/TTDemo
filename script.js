// 页面切换功能
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('new-button')) {
            // 如果点击的是中间的星形按钮，触发AI对话抽屉
            aiDrawer.classList.add('active');
            return;
        }
        
        const pageId = item.dataset.page;
        
        // 更新导航项状态
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // 更新页面显示
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});

// AI对话抽屉功能
const aiButton = document.querySelector('.ai-button');
const aiDrawer = document.querySelector('.ai-drawer');
const closeDrawer = document.querySelector('.close-drawer');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.send-button');
const chatContainer = document.querySelector('.chat-container');

// 添加推荐对话提示
const suggestedPrompts = [
    '帮我设计一个北欧风格的卧室',
    '我女儿7岁了，我该怎么给她布置一个舒适又独立的空间',
    '找一些波西米亚风格的点子'
];

// 显示推荐提示
function showSuggestedPrompts() {
    chatContainer.innerHTML = '';
    const promptsContainer = document.createElement('div');
    promptsContainer.className = 'suggested-prompts';
    promptsContainer.innerHTML = '<h4 style="color: #666; margin-bottom: 12px;">你可以这样问：</h4>';
    
    suggestedPrompts.forEach(prompt => {
        const promptElement = document.createElement('div');
        promptElement.className = 'suggested-prompt';
        promptElement.textContent = prompt;
        promptElement.addEventListener('click', () => {
            chatInput.value = prompt;
            sendMessage();
        });
        promptsContainer.appendChild(promptElement);
    });
    
    chatContainer.appendChild(promptsContainer);
}

// 修改AI抽屉打开事件
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('new-button')) {
            aiDrawer.classList.add('active');
            showSuggestedPrompts();
            return;
        }
        
        const pageId = item.dataset.page;
        
        // 更新导航项状态
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // 更新页面显示
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});

// 修复关闭按钮事件
closeDrawer.addEventListener('click', () => {
    aiDrawer.classList.remove('active');
});

// 发送消息功能
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // 创建用户消息元素
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        const userAvatar = document.createElement('img');
        userAvatar.src = 'images/ico_tt.jpg';
        userAvatar.className = 'message-avatar';
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        userMessage.appendChild(userAvatar);
        userMessage.appendChild(messageContent);
        chatContainer.appendChild(userMessage);
        
        // 清空输入框
        chatInput.value = '';
        
        // 创建AI消息元素，先只显示头像和加载动画
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        const aiAvatar = document.createElement('img');
        aiAvatar.src = 'images/ico_ai.png';
        aiAvatar.className = 'message-avatar';
        const aiMessageContent = document.createElement('div');
        aiMessageContent.className = 'message-content typing';
        aiMessageContent.innerHTML = '<span class="typing-dots">...</span>';
        aiMessage.appendChild(aiAvatar);
        aiMessage.appendChild(aiMessageContent);
        chatContainer.appendChild(aiMessage);
        
        // 滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // 模拟AI思考时间
        setTimeout(() => {
            // 根据不同的问题给出相应的回复
            let response = '抱歉，我需要更多信息来帮助您。';
            if (message.includes('北欧风格')) {
                response = '北欧风格强调简约、自然和功能性。建议您：\n1. 使用浅色调：白色、灰色和原木色\n2. 选择简约的家具：清晰的线条，无复杂装饰\n3. 加入自然元素：绿植、原木材质\n4. 注重采光：大窗户，轻薄窗帘\n5. 搭配温暖织物：毛毯、抱枕';
            } else if (message.includes('7岁') || message.includes('女儿')) {
                response = '为7岁女孩设计房间，建议：\n1. 设置学习区：适合身高的书桌和台灯\n2. 创造收纳空间：便于整理的储物系统\n3. 预留活动区：可以玩耍的空间\n4. 选择活泼色彩：柔和的粉色或紫色\n5. 个性化装饰：可以展示她的作品和收藏';
            } else if (message.includes('波西米亚')) {
                response = '波西米亚风格特点：\n1. 丰富的色彩：深红、橙色、宝石蓝\n2. 多样的图案：民族纹样、曼陀罗图案\n3. 自然材质：藤编、棉麻布艺\n4. 独特装饰：流苏、挂毯、地毯\n5. 混搭家具：复古和手工艺品';
            }
            
            // 移除加载动画
            aiMessageContent.innerHTML = '';
            
            // 逐字显示回复内容
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < response.length) {
                    aiMessageContent.textContent += response[index];
                    index++;
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 1500);
    }
}

// 模拟瀑布流数据
const waterfallGrids = document.querySelectorAll('.waterfall-grid');

// 示例图片数据
const sampleImages = [
    { url: 'images/Weixin Image_20250223213011_22.jpg', title: '现代客厅设计' },
    { url: 'images/Weixin Image_20250223213011_23.jpg', title: '简约卧室布置' },
    { url: 'images/Weixin Image_20250223213011_24.jpg', title: '北欧风格餐厅' },
    { url: 'images/Weixin Image_20250223213011_25.jpg', title: '日式禅意书房' },
    { url: 'images/Weixin Image_20250223213011_26.jpg', title: '工业风办公空间' },
    { url: 'images/Weixin Image_20250223213011_27.jpg', title: '轻奢风格卫浴' },
    { url: 'images/Weixin Image_20250223213011_28.jpg', title: '现代简约厨房' },
    { url: 'images/Weixin Image_20250223213011_29.jpg', title: '北欧风卧室' },
    { url: 'images/Weixin Image_20250223213011_30.jpg', title: '日式和风客厅' },
    { url: 'images/Weixin Image_20250223213011_31.jpg', title: '工业风餐厅' }
];

// 加载瀑布流内容
waterfallGrids.forEach(grid => {
    sampleImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'item';
        // 添加更大范围的随机偏移量，使错落感更明显
        const randomOffset = Math.floor(Math.random() * 120) - 60;
        item.style.setProperty('--random-offset', `${randomOffset}px`);
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div style="padding: ${12 + Math.floor(Math.random() * 20)}px">
                <h3 style="margin-bottom: 8px">${image.title}</h3>
                <p style="color: #666; font-size: 14px">这是一段关于${image.title}的描述文本。</p>
            </div>
            <div class="user-info-bar">
                <div class="user-avatar">
                    <img src="${image.url}" alt="用户头像">
                </div>
                <span class="username">设计师${Math.floor(Math.random() * 1000)}</span>
                <button class="like-button">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
        `;

        // 添加喜欢按钮点击事件
        const likeButton = item.querySelector('.like-button');
        likeButton.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        grid.appendChild(item);
    });
});

// 项目列表数据
const projectList = document.querySelector('.project-list');
const sampleProjects = [
    { title: '现代公寓改造', status: '进行中', progress: '60%' },
    { title: '别墅内装设计', status: '已完成', progress: '100%' },
    { title: '办公空间设计', status: '规划中', progress: '30%' }
];

// 加载项目列表
sampleProjects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project';
    projectItem.innerHTML = `
        <h3 style="margin-bottom: 8px">${project.title}</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px">状态：${project.status}</p>
        <div style="background: #eee; height: 4px; border-radius: 2px">
            <div style="background: #007AFF; height: 100%; width: ${project.progress}; border-radius: 2px"></div>
        </div>
    `;
    projectList.appendChild(projectItem);
});