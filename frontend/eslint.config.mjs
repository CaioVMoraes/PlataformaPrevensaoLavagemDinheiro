import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**'],
  },
];
