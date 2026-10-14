
// React
import React from 'react';

// MUI 
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TranslateIcon from '@mui/icons-material/Translate';

// Local
import ResumeCard from './ResumeCard';

// Section heading with a leading icon, for consistent visual anchors.
function SectionTitle({ icon: Icon, children }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon fontSize="small" color="primary" />
            <Typography variant="h6" component="div">
                {children}
            </Typography>
        </Box>
    );
}


// ResumePortfolio: A React component that displays a resume/portfolio.
export default function ResumePortfolio({ profile, t }) {
    return (
        <Box>
            <Grid container spacing={2}>

                {/* Left Column */}
                <Grid item xs={12} md={4}>

                    {/* Profile */}
                    <ResumeCard>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                alt={profile.name}
                                src={profile.avatar}
                                sx={{ width: 100, height: 100, border: '2px solid', borderColor: 'primary.main' }}
                            />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                {profile.name}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                {profile.address}
                            </Typography>
                            {/* ... other personal information */}
                        </Box>

                        {/* Professional summary — right under name/title */}
                        {profile.summary && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 1.5,
                                    borderRadius: 2,
                                    borderLeft: '3px solid',
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                }}
                            >
                                <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.65 }}>
                                    {profile.summary}
                                </Typography>
                            </Box>
                        )}

                        {/* Contact Details */}
                        <Divider sx={{ mt: 2 }} />
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
                                >
                                    <ListItemIcon>
                                        <contact.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={contact.label} secondary={contact.value} />
                                </ListItemButton>
                            ))}
                        </List>
                        <Divider sx={{ mb: 2 }} />

                        {/* Skills */}
                        <SectionTitle icon={PsychologyIcon}>{t.skills}</SectionTitle>
                        <Box sx={{ mt: 1 }}>
                            {profile.skills.map((skill, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {skill.category}
                                    </Typography>
                                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                                        {skill.skills.map((tag, i) => (
                                            <Chip
                                                key={i}
                                                label={tag}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'divider',
                                                    color: 'text.secondary',
                                                    fontSize: '0.72rem',
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            ))}
                        </Box>

                        {/* Spoken Languages */}
                        {profile.languages && profile.languages.length > 0 && (
                            <>
                                <Divider sx={{ mt: 1, mb: 2 }} />
                                <SectionTitle icon={TranslateIcon}>{t.languages}</SectionTitle>
                                <Box sx={{ mt: 1 }}>
                                    {profile.languages.map((language, index) => {
                                        // Map textual level to a 0-3 strength for the dots.
                                        const lvl = language.level.toLowerCase();
                                        const strength =
                                            lvl.includes('nativ') ? 3
                                            : (lvl.includes('advanc') || lvl.includes('avanç')) ? 3
                                            : (lvl.includes('intermed')) ? 2
                                            : 1;
                                        return (
                                            <Box
                                                key={index}
                                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}
                                            >
                                                <Typography variant="body2">{language.label}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {language.level}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', gap: 0.4 }}>
                                                        {[1, 2, 3].map((d) => (
                                                            <Box
                                                                key={d}
                                                                sx={{
                                                                    width: 7,
                                                                    height: 7,
                                                                    borderRadius: '50%',
                                                                    bgcolor: d <= strength ? 'primary.main' : 'divider',
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </>
                        )}
                    </ResumeCard>

                    {/* Social Media Links */}
                    <ResumeCard>
                        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                            {t.socialMedia}
                        </Typography>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
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
                    </ResumeCard>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={8}>

                    {/* Education */}
                    <ResumeCard>
                        <SectionTitle icon={SchoolIcon}>{t.education}</SectionTitle>
                        <Box sx={{ mt: 2 }}>
                            {profile.education.map((education, index) => (
                                <React.Fragment key={index}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle1">{education.degree}</Typography>
                                        <Typography variant="body2" color="text.secondary">{education.date}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {education.school}
                                        </Typography>
                                        {education.gpa && (
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {education.gpa}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Divider but not for single or last item */}
                                    {index !== profile.education.length - 1 && (
                                        <Divider sx={{ mb: 2 }} />
                                    )}

                                </React.Fragment>
                            ))}
                        </Box>
                    </ResumeCard>

                    {/* Work Experience */}
                    <ResumeCard>
                        <SectionTitle icon={WorkIcon}>{t.workExperience}</SectionTitle>
                        <Box sx={{ mt: 2 }}>
                            {profile.experience.map((experience, index) => (
                                <React.Fragment key={index}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle1">{experience.title}</Typography>
                                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                                            {(() => {
                                                const [period, ...rest] = experience.date.split(' · ');
                                                const place = rest.join(' · ');
                                                return (
                                                    <>
                                                        <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
                                                            {period}
                                                        </Box>
                                                        {place && (
                                                            <Box component="span" sx={{ color: 'text.secondary' }}>
                                                                {' · ' + place}
                                                            </Box>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </Typography>
                                        {experience.bullets && experience.bullets.length > 0 ? (
                                            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5 }}>
                                                {experience.bullets.map((point, i) => (
                                                    <Typography key={i} component="li" variant="body2" sx={{ mb: 0.5 }}>
                                                        {point}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {experience.description}
                                            </Typography>
                                        )}
                                        {experience.stack && experience.stack.length > 0 && (
                                            <Stack direction="row" sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                                                {experience.stack.map((tag, i) => (
                                                    <Chip key={i} label={tag} size="small" variant="outlined" color="primary" />
                                                ))}
                                            </Stack>
                                        )}
                                    </Box>

                                    {/* Divider but not for single or last item */}
                                    {index !== profile.experience.length - 1 && (
                                        <Divider sx={{ mb: 2 }} />
                                    )}

                                </React.Fragment>
                            ))}
                        </Box>
                    </ResumeCard>

                    {/* Publications */}
                    {profile.publications && profile.publications.length > 0 && (
                        <ResumeCard>
                            <SectionTitle icon={ArticleIcon}>{t.publications}</SectionTitle>
                            <Box sx={{ mt: 2 }}>
                                {profile.publications.map((pub, index) => (
                                    <Box key={index} sx={{ mb: index !== profile.publications.length - 1 ? 2 : 0 }}>
                                        <Typography
                                            variant="subtitle1"
                                            {...(pub.href
                                                ? {
                                                    component: 'a',
                                                    href: pub.href,
                                                    target: '_blank',
                                                    rel: 'noopener noreferrer',
                                                    sx: { color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
                                                }
                                                : {})}
                                        >
                                            {pub.title}
                                        </Typography>
                                        {pub.venue && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {pub.venue}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </ResumeCard>
                    )}

                </Grid>
 
            </Grid>
        </Box>
    );
}