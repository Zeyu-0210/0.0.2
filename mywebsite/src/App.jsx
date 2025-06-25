import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#007bff',
  secondary: '#6c757d',
  card: '#f8f9fa',
}

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  primary: '#0d6efd',
  secondary: '#adb5bd',
  card: '#23272f',
}

const Layout = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`

const menu = [
  { key: 'welcome', label: '欢迎' },
  { key: 'profile', label: '个人信息' },
  { key: 'life', label: '我的生活' },
]

const langMap = {
  zh: {
    welcome: '欢迎',
    profile: '个人信息',
    life: '我的生活',
    welcomeTitle: '欢迎来到我的个人网站',
    langBtn: 'English',
    themeBtn: '深色模式',
    themeBtnLight: '浅色模式',
  },
  en: {
    welcome: 'Welcome',
    profile: 'Profile',
    life: 'My Life',
    welcomeTitle: 'Welcome to my personal website',
    langBtn: '中文',
    themeBtn: 'Dark Mode',
    themeBtnLight: 'Light Mode',
  }
}

// TopRight 组件
const TopRight = ({ langBtn, themeBtn, themeBtnLight, isDark, onLangSwitch, onThemeSwitch }) => {
  const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.theme.secondary};
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  `;
  const TopRightWrap = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 10px;
  `;
  return (
    <TopRightWrap>
      <Button onClick={onLangSwitch}>{langBtn}</Button>
      <Button onClick={onThemeSwitch}>{isDark ? themeBtnLight : themeBtn}</Button>
    </TopRightWrap>
  )
}

// Sidebar 组件
const Sidebar = ({ menu, active, onMenuClick, t }) => {
  const SidebarWrap = styled.nav`
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: ${props => props.theme.card};
    padding: 1rem;
    border-radius: 0 10px 10px 0;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
    @media (max-width: 600px) {
      top: 0;
      left: 0;
      transform: none;
      width: 100vw;
      border-radius: 0 0 10px 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;
  const SideNavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;
  const SideNavItem = styled.li`
    padding: 0.8rem 1.2rem;
    margin: 0.5rem 0;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
    color: ${props => props.theme.text};
    background: ${props => (props.active ? props.theme.primary : 'none')};
    color: ${props => (props.active ? 'white' : props.theme.text)};
    &:hover {
      background: ${props => props.theme.primary};
      color: white;
    }
    @media (max-width: 600px) {
      display: inline-block;
      margin: 0 0.5rem;
    }
  `;
  return (
    <SidebarWrap>
      <SideNavList>
        {menu.map(item => (
          <SideNavItem
            key={item.key}
            active={active === item.key}
            onClick={() => onMenuClick(item.key)}
          >
            {t[item.key]}
          </SideNavItem>
        ))}
      </SideNavList>
    </SidebarWrap>
  )
}

// Main/FullscreenBg 组件
const Main = ({ welcomeTitle }) => {
  const MainWrap = styled.main`
    min-height: 100vh;
    margin-left: 60px;
    @media (max-width: 600px) {
      margin-left: 0;
      margin-top: 60px;
    }
  `;
  const FullscreenBg = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100vw; height: 100vh;
    z-index: 1;
    overflow: hidden;
  `;
  const BgVideo = styled.video`
    position: absolute;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    object-fit: cover;
  `;
  const BgOverlay = styled.div`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2;
  `;
  const CenteredWelcome = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    text-align: center;
    color: white;
  `;
  const WelcomeTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  `;
  return (
    <MainWrap>
      <FullscreenBg>
        <BgVideo autoPlay loop muted playsInline>
          <source src="resource/1.mp4" type="video/mp4" />
        </BgVideo>
        <BgOverlay />
        <CenteredWelcome>
          <WelcomeTitle>{welcomeTitle}</WelcomeTitle>
        </CenteredWelcome>
      </FullscreenBg>
    </MainWrap>
  )
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  })
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('currentLang') || 'zh';
  })
  const [active, setActive] = useState('welcome')

  const handleMenuClick = key => {
    if (key === 'profile') {
      window.location.href = 'resume.html'
    } else {
      setActive(key)
    }
  }

  // 主题切换
  const handleThemeSwitch = () => {
    setIsDark(v => {
      const next = !v;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  // 语言切换
  const handleLangSwitch = () => {
    setLang(l => {
      const next = l === 'zh' ? 'en' : 'zh';
      localStorage.setItem('currentLang', next);
      return next;
    });
  }

  const t = langMap[lang];

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Layout>
        <TopRight
          langBtn={t.langBtn}
          themeBtn={t.themeBtn}
          themeBtnLight={t.themeBtnLight}
          isDark={isDark}
          onLangSwitch={handleLangSwitch}
          onThemeSwitch={handleThemeSwitch}
        />
        <Sidebar
          menu={menu}
          active={active}
          onMenuClick={handleMenuClick}
          t={t}
        />
        <Main welcomeTitle={t.welcomeTitle} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
