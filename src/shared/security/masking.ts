export function maskCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  const prefix = digits.slice(0, 3);
  const suffix = digits.slice(-2);

  return `${prefix}.***.***-${suffix}`;
}

export function maskAccount(account: string): string {
  const digits = account.replace(/\D/g, '');
  const suffix = digits.slice(-4);

  return `****${suffix}`;
}
