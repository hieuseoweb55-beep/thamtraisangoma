import { Product } from '../data/products';

export interface InventoryItem {
  ma_hang: string;
  ton_kho: number | string;
}

export async function fetchInventory(allProducts: Product[]): Promise<Record<string, number>> {
  const url = 'https://script.google.com/macros/s/AKfycbyWaf2nCoKQ9Y5V3n3MYlAUcX10S__R2jorfvUcQcMHEy4EmGOd9gpfXhTZfD2WrzEa/exec';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch inventory');
    const data = await response.json();
    
    const inventory: Record<string, number> = {};
    
    // 1. Prepare normalized product codes for matching
    // We sort by length descending to ensure we match the most specific code first (e.g., C101 before C1)
    const normalizedProducts = allProducts.map(p => ({
      originalMaHang: p.ma_hang,
      normalized: p.ma_hang.replace(/[\s-]/g, '').toUpperCase()
    })).sort((a, b) => b.normalized.length - a.normalized.length);

    if (Array.isArray(data) && data.length > 1) {
      // Skip header row (index 0)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (Array.isArray(row) && row.length >= 3) {
          const rawMaHang = row[0]?.toString().trim();
          const tonKho = parseFloat(row[2]?.toString() || '0');
          
          if (rawMaHang && !isNaN(tonKho)) {
            // 2. Normalize the sheet code completely (remove all spaces and dashes)
            const normalizedSheetCode = rawMaHang.replace(/[\s-]/g, '').toUpperCase();
            
            // 3. Find the best matching product
            // We look for the normalized product code within the normalized sheet code
            const match = normalizedProducts.find(p => normalizedSheetCode.includes(p.normalized));
            
            if (match) {
              // 4. Aggregate stock using the original ma_hang as key
              // This ensures the UI (which uses the same products list) can easily find the stock
              const key = match.originalMaHang.replace(/[\s-]/g, '').toUpperCase();
              inventory[key] = (inventory[key] || 0) + tonKho;
            }
          }
        }
      }
    }
    return inventory;
  } catch (error) {
    console.error('Inventory Fetch Error:', error);
    return {};
  }
}
