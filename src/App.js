// React
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

// MUI 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TranslateIcon from '@mui/icons-material/Translate';

// Local
import Portfolio from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ui from './i18n';
import { flushSync } from 'react-dom';

// Print / "Save as PDF": drop the on-screen controls, print every job
// (including the collapsed "Earlier experience") and skip card shadows.
// The light palette for paper is switched on in App via `beforeprint`.
const printStyles = {
    '@media print': {
        '.MuiTabs-root, .MuiIconButton-root, .MuiAccordionSummary-expandIconWrapper': {
            display: 'none !important',
        },
        '.MuiCollapse-root': { height: 'auto !important', visibility: 'visible !important' },
        '.MuiCard-root': { boxShadow: 'none !important' },
    },
};


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

// The active tab lives in the URL hash, so a tab can be linked directly
// (ianncarvalho.github.io/#projects) and Back/Forward move between tabs.
// English slugs are written; the Portuguese ones are accepted too.
const TAB_SLUGS = ['resume', 'projects', 'contact'];
const TAB_ALIASES = { curriculo: 0, 'currículo': 0, projetos: 1, contato: 2 };
const tabFromHash = () => {
    let slug = '';
    try {
        slug = decodeURIComponent(window.location.hash.slice(1)).toLowerCase();
    } catch (e) {
        // malformed hash — fall through to the first tab
    }
    if (TAB_SLUGS.includes(slug)) return TAB_SLUGS.indexOf(slug);
    return TAB_ALIASES[slug] ?? 0;
};

// Tab <-> panel wiring for assistive tech (role="tab" / role="tabpanel").
const tabProps = (i) => ({ id: `tab-${TAB_SLUGS[i]}`, 'aria-controls': `tabpanel-${TAB_SLUGS[i]}` });
const panelProps = (i) => ({ id: `tabpanel-${TAB_SLUGS[i]}`, role: 'tabpanel', 'aria-labelledby': `tab-${TAB_SLUGS[i]}` });

// The App
export default function App({ data }) {

    // Theme mode (dark/light), persisted to localStorage
    const [mode, setMode] = React.useState(getInitialMode);

    // Paper is white: print with the light palette whatever the screen theme.
    // flushSync because the print layout is taken right after `beforeprint`,
    // so the light theme has to be committed before the handler returns.
    const [printing, setPrinting] = React.useState(false);
    React.useEffect(() => {
        const before = () => flushSync(() => setPrinting(true));
        const after = () => setPrinting(false);
        window.addEventListener('beforeprint', before);
        window.addEventListener('afterprint', after);
        return () => {
            window.removeEventListener('beforeprint', before);
            window.removeEventListener('afterprint', after);
        };
    }, []);
    const theme = React.useMemo(() => getTheme(printing ? 'light' : mode), [mode, printing]);

    // Keep the mobile browser toolbar (meta theme-color) in step with the theme.
    React.useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme.palette.background.default);
    }, [theme]);

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

    // Tabs (synced with the URL hash, see tabFromHash)
    const [activeTab, setActiveTab] = React.useState(tabFromHash);
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        const hash = `#${TAB_SLUGS[newValue]}`;
        if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    };
    // Back/Forward and hand-edited hashes switch the tab too.
    React.useEffect(() => {
        const sync = () => setActiveTab(tabFromHash());
        window.addEventListener('popstate', sync);
        window.addEventListener('hashchange', sync);
        return () => {
            window.removeEventListener('popstate', sync);
            window.removeEventListener('hashchange', sync);
        };
    }, []);

    // Tab title (name + role) and <html lang> follow the language; the lang
    // attribute tells screen readers which pronunciation to use. The favicon
    // is static in public/index.html.
    React.useEffect(() => {
        document.title = `${localized.profile.name} — ${localized.profile.role || 'AI/ML Engineer'}`;
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    }, [lang, localized]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={printStyles} />
            {/* The page scrolls as a normal document. This box used to be
                position: fixed + overflow: auto, so the app scrolled inside
                it: printing / "Save as PDF" stopped after one page, PageDown
                and Space did nothing until a click, and mobile browsers could
                not collapse their toolbar or scroll to the top on tap.
                CssBaseline already paints the body with the theme background. */}
            <Box sx={{
                display: 'flex',
                width: '100%',
                bgcolor: 'background.default',
            }}>
                <Container component="main" maxWidth="lg">
                    {/* On phones (xs) the language/theme buttons wrap to their own
                        row, top right, so the tabs get the full width: beside the
                        buttons only ~225px were left and "Contato" started fully
                        off-screen at 360px. From sm up it stays one row. */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        mb: 2,
                    }}>
                        {/* Scrollable instead of `centered`: centered + the standard
                            variant (scroller overflow-x: hidden, justify-content:
                            center) clipped BOTH edges whenever the labels didn't fit
                            beside the language/theme buttons (phones), with no way to
                            scroll. The auto margins on the first/last tab keep the
                            tabs centered when there is room and collapse to 0 when
                            there isn't, so any overflow stays on the scrollable side. */}
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            sx={{
                                flexGrow: 1,
                                order: { xs: 1, sm: 0 },
                                width: { xs: '100%', sm: 'auto' },
                                // 12px side padding on phones (16px default) so the
                                // three PT labels fit in 328px with room to spare.
                                '& .MuiTab-root': { px: { xs: 1.5, sm: 2 } },
                                '& .MuiTab-root:first-of-type': { ml: 'auto' },
                                '& .MuiTab-root:last-of-type': { mr: 'auto' },
                            }}
                        >
                            <Tab label={t.tabResume} {...tabProps(0)} />
                            <Tab label={t.tabProjects} {...tabProps(1)} />
                            <Tab label={t.tabContact} {...tabProps(2)} />
                        </Tabs>
                        <Box sx={{ display: 'flex', ml: 'auto' }}>
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
                                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <AnimatePresence mode='wait'>
                        {activeTab === 0 && (
                            <motion.div
                                key="resume"
                                {...panelProps(0)}
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
                                {...panelProps(1)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeInOutVariants}
                            >
                                <Projects projects={localized.projects} t={t} />
                            </motion.div>
                        )}
                        {activeTab === 2 && (
                            <motion.div
                                key="contact"
                                {...panelProps(2)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeInOutVariants}
                            >
                                <Contact profile={localized.profile} t={t} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </Container>
            </Box>
        </ThemeProvider>
    );
}
