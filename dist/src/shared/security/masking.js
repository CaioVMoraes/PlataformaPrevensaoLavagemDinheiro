"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskCpf = maskCpf;
exports.maskAccount = maskAccount;
function maskCpf(cpf) {
    const digits = cpf.replace(/\D/g, '');
    const prefix = digits.slice(0, 3);
    const suffix = digits.slice(-2);
    return `${prefix}.***.***-${suffix}`;
}
function maskAccount(account) {
    const digits = account.replace(/\D/g, '');
    const suffix = digits.slice(-4);
    return `****${suffix}`;
}
//# sourceMappingURL=masking.js.map