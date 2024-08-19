export const saveUnsyncedItems = (items) => {
  localStorage.setItem('unsyncedItems', JSON.stringify(items));
};

export const getUnsyncedItems = () => {
  const items = localStorage.getItem('unsyncedItems');
  return items ? JSON.parse(items) : [];
};

export const syncItems = async () => {
  const unsyncedItems = getUnsyncedItems();
  if (unsyncedItems.length > 0) {
    try {
      await Promise.all(
        unsyncedItems.map((item) =>
          fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          })
        )
      );
      localStorage.removeItem('unsyncedItems');
    } catch (error) {
      console.error('Failed to sync items:', error);
    }
  }
};

window.addEventListener('online', () => {
  syncItems();
});
