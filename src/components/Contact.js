// React
import React from 'react';

// EmailJS (browser SDK)
import emailjs from '@emailjs/browser';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

// Local
import ResumeCard from './ResumeCard';

// EmailJS config comes from build-time env vars (REACT_APP_*), set as GitHub
// Actions variables — NOT hard-coded in source. All three are public values
// (the EmailJS public key is designed to live in the client bundle), but
// keeping them in env lets you rotate config without touching code.
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// The form only renders when all three are configured; otherwise the section
// degrades to the plain contact channels, so the site never ships a broken form.
const formEnabled = Boolean(
    EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

function ContactForm({ t, emailFallbackHref }) {
    const formRef = React.useRef(null);
    const [status, setStatus] = React.useState('idle'); // idle | sending | success | error

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');

        emailjs
            .sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: EMAILJS_PUBLIC_KEY }
            )
            .then(() => {
                setStatus('success');
                if (formRef.current) formRef.current.reset();
            })
            .catch(() => {
                setStatus('error');
            });
    };

    return (
        <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
            <TextField
                name="from_name"
                label={t.formName}
                fullWidth
                required
                margin="normal"
                autoComplete="name"
            />
            <TextField
                name="reply_to"
                type="email"
                label={t.formEmail}
                fullWidth
                required
                margin="normal"
                autoComplete="email"
            />
            <TextField
                name="message"
                label={t.formMessage}
                fullWidth
                required
                multiline
                minRows={4}
                margin="normal"
            />

            {status === 'success' && (
                <Alert severity="success" sx={{ mt: 2 }}>{t.formSuccess}</Alert>
            )}
            {status === 'error' && (
                <Alert
                    severity="error"
                    sx={{ mt: 2 }}
                    {...(emailFallbackHref
                        ? { action: (
                            <Button color="inherit" size="small" href={emailFallbackHref}>
                                {t.emailMe}
                            </Button>
                        ) }
                        : {})}
                >
                    {t.formError}
                </Alert>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={status === 'sending'}
                    startIcon={status === 'sending'
                        ? <CircularProgress size={18} color="inherit" />
                        : <SendIcon />}
                    sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
                >
                    {status === 'sending' ? t.formSending : t.formSend}
                </Button>
            </Box>
        </Box>
    );
}

// Contact: dedicated section with a working message form (EmailJS) plus every
// contact channel. All profile data comes from TEMPLATE.js; EmailJS config from
// build-time env vars. Form degrades to channels-only when not configured.
export default function Contact({ profile, t }) {
    const emailContact = profile.contacts.find(
        (c) => c.href && c.href.startsWith('mailto:')
    );

    return (
        <Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={7}>
                    <ResumeCard>
                        {/* Heading */}
                        <Box sx={{ textAlign: 'center', mb: 1 }}>
                            <Typography variant="h5" component="div">
                                {t.contactTitle}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1, maxWidth: 520, mx: 'auto', lineHeight: 1.6 }}
                            >
                                {t.contactSubtitle}
                            </Typography>
                        </Box>

                        {/* Working form when EmailJS is configured */}
                        {formEnabled && (
                            <Box sx={{ mt: 2 }}>
                                <ContactForm t={t} emailFallbackHref={emailContact && emailContact.href} />
                                <Divider sx={{ my: 3 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {t.formOrEmail}
                                    </Typography>
                                </Divider>
                            </Box>
                        )}

                        {/* Primary email CTA — shown prominently when there is no form */}
                        {!formEnabled && emailContact && (
                            <>
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<EmailIcon />}
                                        href={emailContact.href}
                                        aria-label={t.emailMe}
                                        sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
                                    >
                                        {emailContact.value}
                                    </Button>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                            </>
                        )}

                        {/* All channels, derived from the data */}
                        <Typography variant="overline" color="text.secondary">
                            {t.contactChannels}
                        </Typography>
                        <List component="nav" dense>
                            {profile.contacts.map((contact, index) => (
                                <ListItemButton
                                    key={index}
                                    {...(contact.href
                                        ? {
                                            component: 'a',
                                            href: contact.href,
                                            target: contact.href.startsWith('mailto:') ? undefined : '_blank',
                                            rel: 'noopener noreferrer',
                                        }
                                        : {})}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemIcon>
                                        <contact.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={contact.label} secondary={contact.value} />
                                </ListItemButton>
                            ))}
                        </List>

                        {/* Social icons */}
                        {profile.socialMedia && profile.socialMedia.length > 0 && (
                            <Box sx={{ mt: 1, textAlign: 'center' }}>
                                {profile.socialMedia.map((media, index) => (
                                    <IconButton
                                        color="primary"
                                        key={index}
                                        aria-label={media.label}
                                        {...(media.href
                                            ? { component: 'a', href: media.href, target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                    >
                                        <media.icon />
                                    </IconButton>
                                ))}
                            </Box>
                        )}
                    </ResumeCard>
                </Grid>
            </Grid>
        </Box>
    );
}
