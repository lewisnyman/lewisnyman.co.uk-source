module.exports = {
  options: {
    dir: 'dist',
    commit: true,
    push: true,
    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
  },
  pages: {
    options: {
      remote: 'https://github.com/lewisnyman/lewisnyman.github.io.git',
      branch: 'master',
      config: {
        'user.name': 'lewisnyman'
      },
    }
  },
  local: {
    options: {
      remote: '../',
      branch: 'app'
    }
  }
};
