// 页面切换功能
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
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

aiButton.addEventListener('click', () => {
    aiDrawer.classList.add('active');
});

closeDrawer.addEventListener('click', () => {
    aiDrawer.classList.remove('active');
});

// 发送消息功能
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // 创建用户消息元素
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatContainer.appendChild(userMessage);
        
        // 清空输入框
        chatInput.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.textContent = '这是一个模拟的AI回复消息。';
            chatContainer.appendChild(aiMessage);
            
            // 滚动到底部
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000);
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
        // 添加随机偏移量
        const randomOffset = Math.floor(Math.random() * 40) - 20;
        item.style.setProperty('--random-offset', `${randomOffset}px`);
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div style="padding: 12px">
                <h3 style="margin-bottom: 8px">${image.title}</h3>
                <p style="color: #666; font-size: 14px">这是一段关于${image.title}的描述文本。</p>
            </div>
        `;
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