import { describe, it, expect } from 'vitest';
import { computeDisplayTotals } from '../services/cartService';

describe('computeDisplayTotals', () => {
  it('sums line totals and adds delivery fee', () => {
    const items = [
      { product: { price: 1000 }, quantity: 2 },
      { product: { price: 500 }, quantity: 1 }
    ];
    const result = computeDisplayTotals(items, 300);
    expect(result.subtotal).toBe(2500);
    expect(result.deliveryFee).toBe(300);
    expect(result.total).toBe(2800);
  });

  it('handles an empty cart', () => {
    const result = computeDisplayTotals([], 0);
    expect(result.subtotal).toBe(0);
    expect(result.total).toBe(0);
  });
});
