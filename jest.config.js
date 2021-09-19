module.exports = {
  'roots': [
    '<rootDir>/tests',
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  'coverageThreshold': {
    'global': {
      'branches': 90,
      'functions': 95,
      'lines': 95,
      'statements': 95,
    },
  },
};
