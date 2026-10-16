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
    // Per-field error, stored as an i18n key so it follows a language switch.
    // The form keeps `noValidate` so the errors show as MUI field states in
    // the site's language (not the browser's native bubbles), which means the
    // checks have to run here before sending.
    const [errors, setErrors] = React.useState({});

    const validate = (form) => {
        const field = (name) => form.elements.namedItem(name);
        const found = {};
        if (!field('from_name').value.trim()) found.from_name = 'formRequired';
        const email = field('reply_to');
        if (!email.value.trim()) found.reply_to = 'formRequired';
        else if (!email.checkValidity()) found.reply_to = 'formInvalidEmail';
        if (!field('message').value.trim()) found.message = 'formRequired';
        return found;
    };

    // Typing in a field clears its error.
    const clearError = (e) => {
        const { name } = e.target;
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        const form = formRef.current;
        const found = validate(form);
        const invalid = Object.keys(found);
        if (invalid.length > 0) {
            setErrors(found);
            setStatus('idle');
            form.elements.namedItem(invalid[0]).focus();
            return;
        }
        setErrors({});
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
                error={Boolean(errors.from_name)}
                helperText={errors.from_name && t[errors.from_name]}
                onChange={clearError}
            />
            <TextField
                name="reply_to"
                type="email"
                label={t.formEmail}
                fullWidth
                required
                margin="normal"
                autoComplete="email"
                error={Boolean(errors.reply_to)}
                helperText={errors.reply_to && t[errors.reply_to]}
                onChange={clearError}
            />
            <TextField
                name="message"
                label={t.formMessage}
                fullWidth
                required
                multiline
                minRows={4}
                margin="normal"
                error={Boolean(errors.message)}
                helperText={errors.message && t[errors.message]}
                onChange={clearError}
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

// Channel list rendered from the profile data (Email, LinkedIn, GitHub,
// Location). Icons tinted in the primary accent. Reused by both the
// two-column (form) layout and the channels-only fallback.
function ChannelList({ profile }) {
    return (
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
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <contact.icon />
                    </ListItemIcon>
                    <ListItemText primary={contact.label} secondary={contact.value} />
                </ListItemButton>
            ))}
        </List>
    );
}

// Contact: dedicated section with a working message form (EmailJS) plus every
// contact channel. All profile data comes from TEMPLATE.js; EmailJS config from
// build-time env vars. Form degrades to channels-only when not configured.
export default function Contact({ profile, t }) {
    const emailContact = profile.contacts.find(
        (c) => c.href && c.href.startsWith('mailto:')
    );

    if (formEnabled) {
        /* Two SEPARATE cards side by side: "Get in touch" (form) on the left,
           "Or reach me directly" (channels) on the right. Each card is its own
           box with its own border/shadow. The right card is narrower (md=4) and
           NOT stretched — alignItems="flex-start" lets it size to its content
           (the four channels) instead of matching the taller form. On narrow
           screens they stack naturally. */
        return (
            <Box>
                <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
                    <Grid item xs={12} md={8}>
                        <ResumeCard>
                            <Typography variant="h5" component="h1" sx={{ mb: 0.5 }}>
                                {t.contactTitle}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2, lineHeight: 1.6 }}
                            >
                                {t.contactSubtitle}
                            </Typography>
                            <ContactForm t={t} emailFallbackHref={emailContact && emailContact.href} />
                        </ResumeCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ResumeCard>
                            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                                {t.formOrEmail}
                            </Typography>
                            <ChannelList profile={profile} />
                        </ResumeCard>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    /* Fallback: no EmailJS configured — CTA + channels in a single centered card. */
    return (
        <Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={7}>
                    <ResumeCard>
                        {/* Heading */}
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="h5" component="h1">
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

                        {emailContact && (
                            <>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
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
                        <Typography variant="overline" color="text.secondary">
                            {t.contactChannels}
                        </Typography>
                        <ChannelList profile={profile} />
                    </ResumeCard>
                </Grid>
            </Grid>
        </Box>
    );
}
