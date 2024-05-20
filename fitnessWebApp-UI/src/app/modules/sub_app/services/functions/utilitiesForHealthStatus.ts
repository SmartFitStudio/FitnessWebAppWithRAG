export function calcolaPesoIdealeKg(altezzaCm: number): number {
    // Formula di Lorenz per il peso ideale in kg
    const pesoIdealeKg = altezzaCm * altezzaCm * 22 / 10000;
    return pesoIdealeKg;
  }