interface RepoConfig {
  templateOwner: string;
  templateRepo: string;
  newOwner: string;
  newRepo: string;
  token: string;
}

function getGithubToken(): string {
  const args = Deno.args;
  const tokenIndex = args.indexOf('--token');
  if (tokenIndex !== -1 && args[tokenIndex + 1]) {
    return args[tokenIndex + 1];
  }

  const envToken = Deno.env.get('GITHUB_TOKEN');
  if (envToken) {
    return envToken;
  }

  throw new Error('GitHub token not provided. Use --token argument or set GITHUB_TOKEN environment variable');
}

async function createRepoFromTemplate(config: RepoConfig): Promise<void> {
  const url = `https://api.github.com/repos/${config.templateOwner}/${config.templateRepo}/generate`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${config.token}`,
    },
    body: JSON.stringify({
      owner: config.newOwner,
      name: config.newRepo,
      private: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create repo: ${response.statusText}`);
  }

  console.log(`Repository created: https://github.com/${config.newOwner}/${config.newRepo}`);
}

if (import.meta.main) {
  const config: RepoConfig = {
    templateOwner: 'example-owner',
    templateRepo: 'example-template',
    newOwner: 'your-username',
    newRepo: 'new-repo-name',
    token: getGithubToken(),
  };

  createRepoFromTemplate(config)
    .catch(console.error);
}
