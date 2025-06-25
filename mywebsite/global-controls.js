/**
 * 全局控制插件 - 个人网站语言切换和主题切换功能
 * 功能包括：
 * 1. 自动注入语言切换和主题切换按钮
 * 2. 管理多语言翻译内容
 * 3. 处理深色/浅色主题切换
 * 4. 动态更新页面内容
 * 5. 侧边栏交互功能
 */

(function() {
    'use strict';

    // 全局变量定义
    let currentLang = localStorage.getItem('currentLang') || 'zh'; // 当前语言，默认中文
    let currentTheme = localStorage.getItem('theme') || 'light'; // 当前主题，默认浅色
    let langSwitch, themeSwitch; // 语言切换和主题切换按钮引用

    // 等待DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initializeControls(); // 初始化控制按钮
        applyTheme(); // 应用当前主题
        applyLanguage(); // 应用当前语言
        setupSidebar(); // 设置侧边栏功能
    });

    /**
     * 初始化控制按钮
     * 自动在页面右上角注入语言切换和主题切换按钮
     */
    function initializeControls() {
        // 创建控制按钮容器
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'top-right-controls';
        controlsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        `;

        // 创建语言切换按钮
        langSwitch = document.createElement('button');
        langSwitch.id = 'langSwitch';
        langSwitch.style.cssText = `
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: var(--text-color);
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        langSwitch.addEventListener('click', toggleLanguage);

        // 创建主题切换按钮
        themeSwitch = document.createElement('button');
        themeSwitch.id = 'themeSwitch';
        themeSwitch.setAttribute('data-lang', 'darkMode');
        themeSwitch.style.cssText = `
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: var(--text-color);
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        themeSwitch.addEventListener('click', toggleTheme);

        // 添加按钮到容器并注入到页面
        controlsContainer.appendChild(langSwitch);
        controlsContainer.appendChild(themeSwitch);
        document.body.appendChild(controlsContainer);
    }

    /**
     * 多语言翻译对象
     * 包含所有页面文本的中英文对照
     */
    const translations = {
        zh: {
            // 基础信息
            name: '林泽宇',
            basicInfo: '基本信息',
            phone: '电话：',
            email: '邮箱：',
            gender: '性别：',
            age: '年龄：',
            workspace: '工作空间',
            workspaceDesc: '这里是我的工作空间，敬请期待。',
            
            // 求职意向
            jobIntention: '求职意向',
            position: '意向岗位：',
            location: '期望地点：',
            type: '求职类型：',
            
            // 页面标题和导航
            selfEval: '自我评价',
            education: '教育经历',
            experience: '实习经历',
            schoolExp: '在校经历',
            skills: '相关技能',
            
            // 主题切换
            darkMode: '深色模式',
            lightMode: '浅色模式',
            
            // 导航菜单
            welcome: '欢迎',
            resume: '个人简历',
            life: '我的生活',
            basicInfo: '基本信息',
            
            // 首页欢迎内容
            welcomeTitle: '欢迎来到我的个人网站',
            welcomeSubtitle: '探索我的专业经历、生活点滴和摄影作品',
            exploreBtn: '查看简历',
            galleryBtn: '浏览相册',
            welcomeText1: '这里记录着我的成长历程、专业技能和生活点滴。',
            welcomeText2: '通过左侧导航，您可以查看我的简历或了解我的生活。',
            
            // 简历页面
            resumeTitle: '个人简历',
            resumeText: '查看我的详细简历，包括教育背景、工作经验和专业技能。',
            viewResume: '查看简历',
            
            // 生活页面
            lifeTitle: '我的生活',
            lifeText1: '这里将展示我的生活点滴、兴趣爱好和日常分享。',
            lifeText2: '（即将推出）',
            home: '首页',
            
            // 摄影页面
            photoTitle: '我的摄影',
            photo: '摄影',
            photoDesc: '记录生活中的美好瞬间。',
            enterPhoto: '进入摄影',
            
            // 做饭页面
            cook: '做饭',
            cookDesc: '分享我的烹饪乐趣与美食。',
            enterCook: '进入做饭',
            
            // 简历页面导航菜单
            navMenu: [ '首页', '教育经历', '实习经历', '奖项经历' ],
            
            // 个人信息列表
            profileInfo: [
                '电话：19902677381',
                '邮箱：zyl1210012109@163.com',
                '性别：男',
                '年龄：23'
            ],
            
            // 求职意向列表
            intentionList: [
                '意向岗位：审计/咨询',
                '期望地点：珠海/深圳',
                '求职类型：全职/实习'
            ],
            
            // 自我评价文本
            selfEvalText: `工作任劳任怨，具有良好的合作心态。
      说话流利不托大，言论不跑火车，不畏怯社交。
      勇于踏出第一步的同时张弛有度。
      会做好多个计划但不死板，会合理根据当下情况调整。`,
            
            // 教育经历列表
            educationList: [
                { school: '新南威尔士大学', date: '2025.06-2027.01', major: '数据安全与数字化转型 | 双硕士', details: '曾获英国卫报排名第七的巴斯大学奖学金，澳门科技大学本科直硕士，QS前30大学直硕士' },
                { school: '澳门科技大学', date: '2021.09-2025.07', major: '商业分析 | 本科', details: '单学期满绩点、实践课程甲等 GPA 3.05/4' }
            ],
            
            // 实习经历列表
            experienceList: [
                { company: '智勤会计师事务所', date: '2025.03-2025.07', position: '审计助理', details: '曾作为7人组审计助理，在一周内完成千万级企业的全面审计，底稿编制效率提高50%' },
                { company: '国投证券营业部', date: '2023.01-2023.02', position: '营业部实习生', details: '作为客户联络人，协助导师两周内完成规模八百万基金募集，月回报率7%，超7成客户表示愿意追投。' },
                { company: '枫威士忌餐饮公司', date: '2022.06-2022.09', position: '经理助理', details: '接待优先客户，负责活动项目安排，任职期间客流量从每月1400人次提高到2300人次，客均消费提高50%，营业额146%' }
            ],
            
            // 在校经历列表
            schoolExpList: [
                { name: '港科大创业大赛', date: '2024.06-2024.09', position: '总联络人/项目负责人', details: '境外赛道第12名 · 项目名称（创新全息交互技术）' },
                { name: '澳门青年创业孵化中心', date: '2023.06-2023.09', position: '项目代表', details: '项目驻澳门青年孵化中心主要负责人 · 长期会员。' }
            ],
            
            // 技能列表
            skillsList: [
                '圣三一口语六级',
                '雅思6分（口语测试6.5）',
                '熟练掌握编程、视频行业垂类的AI工具',
                '国际驾照'
            ],
            
            // Resume页面内容翻译
            // 教育经历页面
            educationSubtitle: '你好，我是林泽宇。这里是我的教育背景介绍，展示了我的学术历程和专业基础。',
            educationTitle1: '数据安全与数字化转型 | 双硕士',
            educationDesc1: '课程涵盖数据保护法规、网络安全、人工智能应用、数字化转型方法论等前沿领域。',
            educationTitle2: '本科教育背景',
            educationDesc2: '在本科阶段系统学习了商业管理、财务分析、市场营销等核心课程，为后续的硕士学习和职业发展奠定了坚实的理论基础。',
            
            // 实习经历页面
            experienceSubtitle: '我在不同行业的实习经验，将理论知识应用于实践，并取得了切实的业务成果。',
            experienceTitle1: '审计助理',
            experienceDesc1: '曾作为7人组审计助理，在一周内完成千万级企业的全面审计，底稿编制效率提高50%。负责财务报表审计、内部控制测试、风险评估等工作。',
            experienceTitle2: '营业部实习生',
            experienceDesc2: '作为客户联络人，协助导师两周内完成规模八百万基金募集，月回报率7%，超7成客户表示愿意追投。',
            experienceTitle3: '经理助理',
            experienceDesc3: '接待优先客户，负责活动项目安排，任职期间客流量从每月1400人次提高到2300人次，营业额增长146%。',
            
            // 奖项经历页面
            awardsSubtitle: '在创业、学术和领导力方面获得的荣誉，这些是对我创新能力和综合素质的认可。',
            awardsTitle1: '港科大创业大赛',
            awardsDesc1: '境外赛道第12名，项目名称（全息交互技术应用）。在激烈的国际竞争中脱颖而出，展现了创新思维和技术实力。',
            awardsTitle2: '澳门青年创业孵化中心',
            awardsDesc2: '项目驻澳门青年孵化中心主要负责人，长期成员。负责项目规划、团队管理、资源整合等工作。',
            awardsTitle3: '巴斯大学管理学院奖学金',
            awardsDesc3: '曾获英国排名第二-巴斯大学管理学院-硕士奖学金，这是对学术成绩和综合能力的认可。'
        },
        en: {
            // Basic Information
            name: 'Lin Zeyu',
            basicInfo: 'Basic Information',
            phone: 'Phone: ',
            email: 'Email: ',
            gender: 'Gender: ',
            age: 'Age: ',
            
            // Career Objective
            jobIntention: 'Career Objective',
            position: 'Position: ',
            location: 'Location: ',
            type: 'Type: ',
            
            // Page Titles and Navigation
            selfEval: 'Self Evaluation',
            education: 'Education',
            experience: 'Internship Experience',
            schoolExp: 'Campus Experience',
            skills: 'Skills',
            
            // Theme Toggle
            darkMode: 'Dark Mode',
            lightMode: 'Light Mode',
            
            // Navigation Menu
            welcome: 'Welcome',
            resume: 'Resume',
            life: 'My Life',
            basicInfo: 'Basic Info',
            workspace: 'Workspace',
            workspaceDesc: 'This is my workspace, coming soon.',
            
            // Homepage Welcome Content
            welcomeTitle: 'Welcome to My Personal Website',
            welcomeSubtitle: 'Explore My Professional Journey, Life Experiences, and Photography',
            exploreBtn: 'View Resume',
            galleryBtn: 'Browse Gallery',
            welcomeText1: 'Here you can find my professional journey, skills, and life experiences.',
            welcomeText2: 'Use the navigation menu to explore my resume or learn more about my life.',
            
            // Resume Page
            resumeTitle: 'Resume',
            resumeText: 'View my detailed resume, including educational background, work experience, and professional skills.',
            viewResume: 'View Resume',
            
            // Life Page
            lifeTitle: 'My Life',
            lifeText1: 'Here I will share my daily life, hobbies, and personal experiences.',
            lifeText2: '(Coming Soon)',
            home: 'Home',
            
            // Photography Page
            photoTitle: 'My Photography',
            photo: 'Photography',
            photoDesc: 'Recording the beautiful moments of life.',
            enterPhoto: 'Enter Photography',
            
            // Cooking Page
            cook: 'Cooking',
            cookDesc: 'Sharing my cooking joys and delicious food.',
            enterCook: 'Enter Cooking',
            
            // Resume Page Navigation Menu
            navMenu: [ 'Home', 'Education', 'Experience', 'Awards' ],
            
            // Profile Information List
            profileInfo: [
                'Phone: 19902677381',
                'Email: zyl1210012109@163.com',
                'Gender: Male',
                'Age: 23'
            ],
            
            // Job Intention List
            intentionList: [
                'Position: Audit/Consulting',
                'Location: Zhuhai/Shenzhen',
                'Type: Full-time/Internship'
            ],
            
            // Self Evaluation Text
            selfEvalText: `I am diligent and responsible, always maintaining a positive and cooperative attitude at work.
I communicate fluently and sincerely, never exaggerating or making empty promises, and I am comfortable in social situations.
I am proactive in taking the initiative while also knowing how to pace myself.
I am good at making multiple plans and can flexibly adjust them according to changing circumstances.`,
            
            // Education List
            educationList: [
                { school: 'University of New South Wales', date: '2025.06-2027.01', major: 'Data Security & Digital Transformation | Dual Master', details: "Bath University (ranked 7th by The Guardian UK) scholarship winner; direct master's from Macau University of Science and Technology; direct master's from QS Top 30 university." },
                { school: 'Macau University of Science and Technology', date: '2021.09-2025.07', major: 'Business Analytics | Bachelor', details: 'Full GPA in a single semester, top grade in practical courses, GPA 3.05/4' }
            ],
            
            // Experience List
            experienceList: [
                { company: 'Zhiqin Accounting Firm', date: '2025.03-2025.07', position: 'Audit Assistant', details: 'Worked as a 7-member audit assistant team, completed a comprehensive audit of a ten-million-level enterprise within one week, and improved working paper preparation efficiency by 50%.' },
                { company: 'Guotou Securities Branch', date: '2023.01-2023.02', position: 'Intern', details: 'As a client liaison, assisted the mentor in raising an 8-million-yuan fund within two weeks, with a monthly return rate of 7%, and over 70% of clients expressed willingness to reinvest.' },
                { company: 'Feng Whisky Catering Company', date: '2022.06-2022.09', position: 'Manager Assistant', details: 'Hosted priority clients and arranged event projects, resulting in increased customer flow from 1400 to 2300 per month, a 50% increase in average spending, and a 146% increase in revenue.' }
            ],
            
            // Campus Experience List
            schoolExpList: [
                { name: 'HKUST Entrepreneurship Competition', date: '2024.06-2024.09', position: 'Team Leader/Project Manager', details: 'Ranked 12th in the overseas track · Project: Innovative Holographic Interaction Technology' },
                { name: 'Macao Youth Entrepreneurship Incubation Centre', date: '2023.06-2023.09', position: 'Project Representative', details: 'Chief representative for the project stationed at the centre · Long-term member.' }
            ],
            
            // Skills List
            skillsList: [
                'Trinity College GESE-6',
                'IELTS 6.5 (Speaking 6.5)',
                'Proficient in AI tools for programming and video industries',
                'International Driving Permit'
            ],
            
            // Resume页面内容翻译
            // 教育经历页面
            educationSubtitle: 'Hello, I am Lin Zeyu. Here is my educational background introduction, showcasing my academic journey and professional foundation.',
            educationTitle1: 'Data Security & Digital Transformation | Dual Master',
            educationDesc1: 'Courses cover cutting-edge areas such as data protection regulations, cybersecurity, AI applications, and digital transformation methodologies.',
            educationTitle2: 'Undergraduate Education Background',
            educationDesc2: 'During undergraduate studies, systematically learned core courses in business management, financial analysis, and marketing, laying a solid theoretical foundation for subsequent master\'s studies and career development.',
            
            // 实习经历页面
            experienceSubtitle: 'My internship experiences in different industries, applying theoretical knowledge to practice and achieving tangible business results.',
            experienceTitle1: 'Audit Assistant',
            experienceDesc1: 'Worked as a 7-member audit assistant team, completed a comprehensive audit of a ten-million-level enterprise within one week, and improved working paper preparation efficiency by 50%. Responsible for financial statement audits, internal control testing, and risk assessment.',
            experienceTitle2: 'Branch Office Intern',
            experienceDesc2: 'As a client liaison, assisted the mentor in raising an 8-million-yuan fund within two weeks, with a monthly return rate of 7%, and over 70% of clients expressed willingness to reinvest.',
            experienceTitle3: 'Manager Assistant',
            experienceDesc3: 'Hosted priority clients and arranged event projects, resulting in increased customer flow from 1400 to 2300 per month, and a 146% increase in revenue.',
            
            // 奖项经历页面
            awardsSubtitle: 'Honors received in entrepreneurship, academics, and leadership, which are recognition of my innovative abilities and comprehensive qualities.',
            awardsTitle1: 'HKUST Entrepreneurship Competition',
            awardsDesc1: 'Ranked 12th in the overseas track, project name (Holographic Interactive Technology Application). Stood out in fierce international competition, demonstrating innovative thinking and technical capabilities.',
            awardsTitle2: 'Macao Youth Entrepreneurship Incubation Centre',
            awardsDesc2: 'Chief representative for the project stationed at the centre, long-term member. Responsible for project planning, team management, and resource integration.',
            awardsTitle3: 'Bath University School of Management Scholarship',
            awardsDesc3: 'Received a master\'s scholarship from Bath University School of Management (ranked 2nd in the UK), which is recognition of academic achievements and comprehensive abilities.'
        }
    };

    /**
     * 主题相关功能
     */
    
    /**
     * 更新主题切换按钮文本
     * 根据当前主题状态显示对应的按钮文本
     */
    function updateThemeButtonText() {
        if (themeSwitch) {
            const key = document.body.classList.contains('dark-theme') ? 'lightMode' : 'darkMode';
            themeSwitch.textContent = (translations[currentLang] && translations[currentLang][key]) || key;
        }
    }

    /**
     * 应用当前主题到页面
     * 设置html的data-theme属性并更新按钮文本
     */
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', currentTheme);
        // 兼容 resume_ginger.css 的深色样式
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        updateThemeButtonText();
    }

    /**
     * 切换深色/浅色主题
     * 在深色和浅色主题之间切换，并保存到本地存储
     */
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme();
    }

    /**
     * 语言相关功能
     */
    
    /**
     * 应用当前语言到页面
     * 更新HTML lang属性、按钮文本和所有带data-lang属性的元素
     */
    function applyLanguage() {
        // 设置HTML文档的语言属性
        document.documentElement.lang = currentLang;
        
        // 更新语言切换按钮文本
        langSwitch.textContent = currentLang === 'zh' ? 'English' : '中文';

        // 更新所有带data-lang属性的元素文本
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
        
        // 更新动态内容（如列表、复杂结构等）
        updateDynamicContent();
        
        // 更新主题按钮文本（因为语言切换后按钮文本也需要更新）
        updateThemeButtonText();
    }

    /**
     * 切换中英文语言
     * 在中文和英文之间切换，并保存到本地存储
     */
    function toggleLanguage() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('currentLang', currentLang);
        applyLanguage();
    }

    /**
     * 更新动态内容
     * 处理需要特殊处理的动态内容，如列表、复杂结构等
     */
    function updateDynamicContent() {
        const t = translations[currentLang];
        if (!t) return;

        // 简历页面：个人信息列表更新
        const profileInfoList = document.querySelector('#profile .info-list');
        if (profileInfoList && t.profileInfo) {
            profileInfoList.innerHTML = t.profileInfo.map(item => `<li>${item}</li>`).join('');
        }

        // 简历页面：求职意向列表更新
        const intentionList = document.querySelector('#intention .info-list');
        if (intentionList && t.intentionList) {
            intentionList.innerHTML = t.intentionList.map(item => `<li>${item}</li>`).join('');
        }
        
        // 简历页面：自我评价文本更新
        const selfEval = document.querySelector('.self-eval');
        if (selfEval && t.selfEvalText) {
            selfEval.textContent = t.selfEvalText;
        }

        // 简历页面：教育经历时间线更新
        const eduSection = document.querySelector('#education .timeline');
        if (eduSection && t.educationList) {
            eduSection.innerHTML = t.educationList.map(e => `
                <div class="timeline-item">
                    <div class="timeline-header"><h3>${e.school}</h3><span class="date">${e.date}</span></div>
                    <div class="timeline-content"><p class="major">${e.major}</p><p class="details">${e.details}</p></div>
                </div>`).join('');
        }

        // 简历页面：实习经历时间线更新
        const expSection = document.querySelector('#experience .timeline');
        if (expSection && t.experienceList) {
            expSection.innerHTML = t.experienceList.map(e => `
                <div class="timeline-item">
                    <div class="timeline-header"><h3>${e.company}</h3><span class="date">${e.date}</span></div>
                    <div class="timeline-content"><p class="position">${e.position}</p><p class="details">${e.details}</p></div>
                </div>`).join('');
        }

        // 简历页面：在校经历时间线更新
        const schoolExpSection = document.querySelector('#schoolExp .timeline');
        if (schoolExpSection && t.schoolExpList) {
            schoolExpSection.innerHTML = t.schoolExpList.map(e => `
                <div class="timeline-item">
                    <div class="timeline-header"><h3>${e.name}</h3><span class="date">${e.date}</span></div>
                    <div class="timeline-content"><p class="position">${e.position}</p><p class="details">${e.details}</p></div>
                </div>`).join('');
        }
        
        // 简历页面：技能列表更新
        const skillsList = document.querySelector('#skills .skills-list');
        if (skillsList && t.skillsList) {
            skillsList.innerHTML = t.skillsList.map(skill => `<li>${skill}</li>`).join('');
        }

        // 简历页面：侧边导航菜单更新（只影响简历页面）
        const resumePages = ['resume_education.html', 'resume_experience.html', 'resume_awards.html'];
        const currentPage = window.location.pathname.split('/').pop();
        if (resumePages.includes(currentPage)) {
            const navMenuItems = document.querySelectorAll('.side-nav-list li');
            if (navMenuItems.length > 0 && t.navMenu) {
                navMenuItems.forEach((item, index) => {
                    if (t.navMenu[index]) {
                        item.textContent = t.navMenu[index];
                    }
                });
            }
        }
    }

    /**
     * 侧边栏功能设置
     * 处理侧边导航栏的展开/收起和鼠标悬停效果
     */
    function setupSidebar() {
        const sideNav = document.getElementById('sideNav');
        const sideNavToggle = document.getElementById('sideNavToggle');
        
        if (!sideNav || !sideNavToggle) return;

        // 鼠标悬停时展开侧边栏
        sideNav.addEventListener('mouseenter', () => {
            sideNav.classList.remove('minimized');
        });

        // 鼠标离开时收起侧边栏
        sideNav.addEventListener('mouseleave', () => {
            sideNav.classList.add('minimized');
        });

        // 点击切换按钮展开/收起侧边栏
        sideNavToggle.addEventListener('click', () => sideNav.classList.toggle('minimized'));
    }

    // 防止页面闪烁：在脚本加载完成后添加类名
    document.body.classList.add('global-controls-loaded');
})(); 