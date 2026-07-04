import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchInventory } from '../services/inventoryService';
import { products } from '../data/products';

interface InventoryContextType {
  inventory: Record<string, number>;
  loading: boolean;
  lastUpdated: Date | null;
  refreshInventory: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshInventory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchInventory(products);
      setInventory(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh inventory:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshInventory();
  }, [refreshInventory]);

  return (
    <InventoryContext.Provider value={{ inventory, loading, lastUpdated, refreshInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
