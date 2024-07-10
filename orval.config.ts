module.exports = {
    'Iscorka-file': {
      mode: 'split',
      input: './swagger.yaml',
      output: {
        target: 'src/api/iscorka.ts',
        schemas: 'src/api/model',
        client: 'react-query',
        mock: true,
      }
  },
};