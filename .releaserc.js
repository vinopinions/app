module.exports = {
  branches: [
    {
      name: 'master',
    },
    {
      name: 'developer',
      prerelease: 'dev',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/git',
  ],
};
