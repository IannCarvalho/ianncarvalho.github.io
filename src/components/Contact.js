// React
import React from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';

// Local
import ResumeCard from './ResumeCard';

// Contact: dedicated section with a clear email CTA plus every contact channel
// in one calm, spacious layout. All data comes from TEMPLATE.js (profile), so
// there is nothing hard-coded to drift. The form (EmailJS) lands in a later PR;
// the layout already leaves room for it in the right column.
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

                        {/* Primary email CTA */}
                        {emailContact && (
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
                        )}

                        <Divider sx={{ my: 3 }} />

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
