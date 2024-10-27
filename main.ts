interface RepoConfig {
  templateOwner: string;
  templateRepo: string;
  newOwner: string;
  newRepo: string;
  token: string;
}

interface ArgConfig {
  argName: string;
  envVar: string;
  friendlyName: string;
}

const ARG_CONFIGS: Record<keyof RepoConfig, ArgConfig> = {
  templateOwner: {
    argName: '--template-owner',
    envVar: 'TEMPLATE_OWNER',
    friendlyName: 'Template owner',
  },
  templateRepo: {
    argName: '--template-repo',
    envVar: 'TEMPLATE_REPO',
    friendlyName: 'Template repository',
  },
  newOwner: {
    argName: '--owner',
    envVar: 'GITHUB_OWNER',
    friendlyName: 'New owner',
  },
  newRepo: {
    argName: '--name',
    envVar: 'GITHUB_REPO_NAME',
    friendlyName: 'Repository name',
  },
  token: {
    argName: '--token',
    envVar: 'GITHUB_TOKEN',
    friendlyName: 'GitHub token',
  },
};

function getArg(config: ArgConfig, defaultValue?: string): string {
  const args = Deno.args;
  const argIndex = args.indexOf(config.argName);
  if (argIndex !== -1 && args[argIndex + 1]) {
    return args[argIndex + 1];
  }

  const envValue = Deno.env.get(config.envVar);
  if (envValue) {
    return envValue;
  }

  if (defaultValue !== undefined) {
    console.log(`${config.friendlyName} not provided, defaulting to: ${defaultValue}`);
    return defaultValue;
  }

  throw new Error(
    `${config.friendlyName} not provided. Use ${config.argName} argument or set ${config.envVar} environment variable`
  );
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
    templateOwner: getArg(ARG_CONFIGS.templateOwner, 'dewinterjack'),
    templateRepo: getArg(ARG_CONFIGS.templateRepo, 't3-turbo-and-clerk'),
    newOwner: getArg(ARG_CONFIGS.newOwner),
    newRepo: getArg(ARG_CONFIGS.newRepo),
    token: getArg(ARG_CONFIGS.token),
  };

  createRepoFromTemplate(config)
    .catch(console.error);
}
