// React
import React from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';


// A single project card.
function ProjectCard({ project, t }) {
    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'primary.main',
            },
            '@media (prefers-reduced-motion: reduce)': {
                transition: 'border-color 0.2s ease',
                '&:hover': { transform: 'none' },
            },
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    {project.title}
                </Typography>
                {project.period && (
                    <Typography variant="caption" color="text.secondary">
                        {project.period}
                    </Typography>
                )}
                {project.highlights && project.highlights.length > 0 ? (
                    <Box
                        component="ul"
                        sx={{ mt: 1.5, mb: 0, pl: 2.5, color: 'text.secondary' }}
                    >
                        {project.highlights.map((point, i) => (
                            <Typography
                                key={i}
                                component="li"
                                variant="body2"
                                sx={{ mb: 0.75 }}
                            >
                                {point}
                            </Typography>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                        {project.description}
                    </Typography>
                )}
                {/* Spacing via `gap` only (same as the Resume chips). Stack's
                    `spacing` prop adds margin-left to every chip but the first,
                    so a wrapped row started indented and gaps doubled. */}
                <Stack direction="row" sx={{ mt: 2, flexWrap: 'wrap', gap: 0.75 }}>
                    {project.tech.map((techLabel, i) => (
                        <Chip
                            key={i}
                            label={techLabel}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.72rem' }}
                        />
                    ))}
                </Stack>
            </CardContent>
            {(() => {
                // Normalize to a list of {label, href}: prefer `repos` array,
                // else fall back to a single `repo` labelled with t.code.
                const repoLinks = project.repos && project.repos.length > 0
                    ? project.repos
                    : (project.repo ? [{ label: t.code, href: project.repo }] : []);
                if (repoLinks.length === 0 && !project.demo) return null;
                // `disableSpacing` + gap only: CardActions' default spacing adds
                // margin-left to every button but the first, so a wrapped row
                // started indented. columnGap 1.5 (12px) keeps the old in-row
                // spacing (8px margin + 4px gap); rowGap keeps the 4px.
                return (
                    <CardActions
                        disableSpacing
                        sx={{ px: 2, pb: 2, flexWrap: 'wrap', columnGap: 1.5, rowGap: 0.5 }}
                    >
                        {repoLinks.map((r, i) => (
                            <Button
                                key={i}
                                size="small"
                                startIcon={<GitHubIcon />}
                                href={r.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {r.label}
                            </Button>
                        ))}
                        {project.demo && (
                            <Button
                                size="small"
                                startIcon={<LaunchIcon />}
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.demo}
                            </Button>
                        )}
                    </CardActions>
                );
            })()}
        </Card>
    );
}


// Projects: personal-project cards, grouped by category.
export default function Projects({ projects, t }) {

    // Group projects by category, preserving first-seen order.
    const groups = [];
    const indexByCategory = {};
    projects.forEach((project) => {
        const category = project.category || '—';
        if (indexByCategory[category] === undefined) {
            indexByCategory[category] = groups.length;
            groups.push({ category, items: [] });
        }
        groups[indexByCategory[category]].items.push(project);
    });

    return (
        <Box sx={{ mb: 10 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 1, textAlign: 'center' }}>
                {t.projectsTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                {t.projectsSubtitle}
            </Typography>

            {groups.map((group, gi) => (
                <Box key={gi} sx={{ mb: 4 }}>
                    <Typography
                        variant="overline"
                        component="h2"
                        color="primary"
                        sx={{ display: 'block', mb: 1.5, letterSpacing: 1 }}
                    >
                        {group.category}
                    </Typography>
                    <Grid container spacing={2}>
                        {group.items.map((project, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <ProjectCard project={project} t={t} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
}
