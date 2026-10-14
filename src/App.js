// React
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

// MUI 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';

// Local
import Portfolio from './components/Resume';
import Projects from './components/Projects';
import ui from './i18n';


// Fade In/Out Variants
const fadeInOutVariants = {
    hidden: { opacity: 0, scale: 0.9 }, // start a bit smaller
    visible: { opacity: 1, scale: 1 }, // grow past the original size
    exit: { opacity: 0, scale: 0.9 } // revert back to smaller size on exit
};

// MUI Theme — generated per mode (dark/light).
const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                background: {
                    default: '#0d1117',
                    paper: '#161b22',
                },
                primary: {
                    main: '#58a6ff',
                },
                text: {
                    primary: '#e6edf3',
                    secondary: '#8b949e',
                },
            }
            : {
                background: {
                    default: '#f6f8fa',
                    paper: '#ffffff',
                },
                primary: {
                    main: '#0969da',
                },
                text: {
                    primary: '#1f2328',
                    secondary: '#656d76',
                },
            }),
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: mode === 'dark'
                        ? '1px solid rgba(240, 246, 252, 0.1)'
                        : '1px solid rgba(31, 35, 40, 0.12)',
                    backgroundImage: 'none',
                },
            },
        },
    },
});

// Resolve the initial theme mode: saved preference wins, else default dark.
const getInitialMode = () => {
    try {
        const saved = window.localStorage.getItem('themeMode');
        if (saved === 'light' || saved === 'dark') {
            return saved;
        }
    } catch (e) {
        // localStorage unavailable (e.g. private mode) — fall through to default
    }
    return 'dark';
};

// Resolve the initial language: saved preference wins, else browser hint, else English.
const getInitialLang = () => {
    try {
        const saved = window.localStorage.getItem('lang');
        if (saved === 'en' || saved === 'pt') {
            return saved;
        }
    } catch (e) {
        // localStorage unavailable — fall through
    }
    try {
        if ((navigator.language || '').toLowerCase().startsWith('pt')) {
            return 'pt';
        }
    } catch (e) {
        // navigator unavailable — fall through
    }
    return 'en';
};

// The App
export default function App({ data }) {

    // Theme mode (dark/light), persisted to localStorage
    const [mode, setMode] = React.useState(getInitialMode);
    const theme = React.useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            try {
                window.localStorage.setItem('themeMode', next);
            } catch (e) {
                // ignore write failures
            }
            return next;
        });
    };

    // Language (en/pt), persisted to localStorage
    const [lang, setLang] = React.useState(getInitialLang);
    const t = ui[lang];
    const localized = data[lang];

    const toggleLang = () => {
        setLang((prev) => {
            const next = prev === 'en' ? 'pt' : 'en';
            try {
                window.localStorage.setItem('lang', next);
            } catch (e) {
                // ignore write failures
            }
            return next;
        });
    };

    // Tabs
    const [activeTab, setActiveTab] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const updateFavicon = (tabIndex) => {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `${localized.profile.avatar}`;
        document.title = `${localized.profile.name}`;
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    React.useEffect(() => {
        updateFavicon(activeTab); // Update favicon/title on load, tab change and language change
        // eslint-disable-next-line
    }, [activeTab, lang]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                position: "fixed",
                overflow: 'auto',
                width: '100%',
                height: "100%",
                bgcolor: 'background.default',
            }}>
                <Container component="main" maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}>
                        <Tabs value={activeTab} onChange={handleTabChange} sx={{ flexGrow: 1 }} centered>
                            <Tab label={t.tabResume} />
                            <Tab label={t.tabProjects} />
                        </Tabs>
                        <Tooltip title={lang === 'en' ? 'Português' : 'English'}>
                            <IconButton onClick={toggleLang} color="inherit" aria-label={t.toggleLanguage}>
                                <TranslateIcon />
                                <Box component="span" sx={{ ml: 0.5, fontSize: 14, fontWeight: 600 }}>
                                    {lang === 'en' ? 'PT' : 'EN'}
                                </Box>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={mode === 'dark' ? t.themeToLight : t.themeToDark}>
                            <IconButton onClick={toggleMode} color="inherit" aria-label={t.toggleTheme}>
                                {mode === 'dark' ? <Brightness7Icon /> : <DarkModeIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <AnimatePresence mode='wait'>
                        {activeTab === 0 && (
                            <motion.div
                                key="resume"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeInOutVariants}
                            >
                                <Portfolio profile={localized.profile} t={t} />
                            </motion.div>
                        )}
                        {activeTab === 1 && (
                            <motion.div
                                key="projects"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeInOutVariants}
                            >
                                <Projects projects={localized.projects} t={t} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </Container>
            </Box>
        </ThemeProvider>
    );
}
