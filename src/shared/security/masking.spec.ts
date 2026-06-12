import { maskAccount, maskCpf } from './masking';

describe('masking', () => {
  it('masks CPF according to business rule', () => {
    expect(maskCpf('12345678945')).toBe('123.***.***-45');
  });

  it('masks account according to business rule', () => {
    expect(maskAccount('003412345678')).toBe('****5678');
  });
});
