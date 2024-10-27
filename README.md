# Project Setup

Set up new projects.

## Running

```bash
deno run --allow-env --allow-net --allow-run main.ts --token=<your-github-token> --owner=<your-github-username> --name=<your-repo-name>
```

## Required Environment Variables or Arguments

| Variable | Description | CLI Argument | Required | Default |
|----------|-------------|--------------|----------|---------|
| `GITHUB_TOKEN` | Your GitHub token | `--token=<your-github-token>` | Yes | |
| `GITHUB_OWNER` | Your GitHub username | `--owner=<your-github-username>` | Yes |
| `GITHUB_REPO_NAME` | The name of the new repository | `--name=<your-repo-name>` | Yes |
| `TEMPLATE_OWNER` | The owner of the template repository | `--template-owner=<template-owner>` | No | `dewinterjack` |
| `TEMPLATE_REPO` | The name of the template repository | `--template-repo=<template-repo>` | No | `t3-turbo-and-clerk` |
| `TURBO_TOKEN` | Turbo remote cache token | `--turbo-token=<turbo-token>` | Yes | |
| `TURBO_TEAM` | Turbo team name | `--turbo-team=<turbo-team>` | Yes | |