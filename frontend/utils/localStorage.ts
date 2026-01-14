// Utility functions for localStorage management

export const clearAllGusData = () => {
  const keys = Object.keys(localStorage);
  const gusKeys = keys.filter(key => key.startsWith('gus_'));

  console.log('Clearing localStorage keys:', gusKeys);

  gusKeys.forEach(key => {
    localStorage.removeItem(key);
  });

  console.log('All Gus data cleared from localStorage');
};

export const debugLocalStorage = () => {
  const keys = Object.keys(localStorage);
  const gusKeys = keys.filter(key => key.startsWith('gus_'));

  console.log('=== DEBUG: Current localStorage Gus data ===');
  gusKeys.forEach(key => {
    console.log(`${key}:`, localStorage.getItem(key));
  });
  console.log('============================================');
};

// Add to window for easy debugging
if (typeof window !== 'undefined') {
  (window as any).clearGusData = clearAllGusData;
  (window as any).debugGusData = debugLocalStorage;
}