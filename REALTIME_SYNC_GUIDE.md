# Real-Time Table Synchronization Guide

## Overview
Currently, the app uses **localStorage** which is local to each browser. To enable real-time synchronization where multiple users at the same table can see each other's orders, we need to:

1. **Replace localStorage with backend API calls**
2. **Add polling mechanism** to check for updates
3. **Sync table users and orders** from the backend
4. **Update UI** when changes are detected

## Current State

### Backend (Already Implemented ✅)
- `GET /api/restaurants/{restaurant_id}/tables/{table_number}/users` - Get all users at table
- `POST /api/restaurants/{restaurant_id}/tables/{table_number}/users` - Join table
- `PUT /api/restaurants/{restaurant_id}/tables/{table_number}/users/{user_id}` - Update user name
- `DELETE /api/restaurants/{restaurant_id}/tables/{table_number}/users/{user_id}` - Leave table
- `GET /api/restaurants/{restaurant_slug}/tables/{table_number}/orders` - Get active order for table
- Orders are stored with `ordered_by` field to track who ordered what

### Frontend (Needs Changes ❌)
- Currently uses **localStorage only** (`gus_table_${tableId}`, `gus_userId`, etc.)
- No backend sync for table users
- No polling to detect other users' changes
- Orders are stored locally, not synced from backend

## Required Changes

### 1. Add Table User API Methods to `frontend/services/api.ts`

```typescript
// Add these interfaces
export interface ApiTableUser {
  id: string;           // user_id (frontend-generated)
  name: string;
  joined_at: string;     // ISO timestamp
  is_active: boolean;
}

export interface ApiTableUserJoin {
  name: string;
}

// Add these methods to ApiService class:
async getTableUsers(
  restaurantSlug: string,
  tableNumber: number
): Promise<ApiTableUser[]> {
  return this.request<ApiTableUser[]>(
    `/api/restaurants/${restaurantSlug}/tables/${tableNumber}/users`
  );
}

async joinTable(
  restaurantSlug: string,
  tableNumber: number,
  userId: string,
  userName: string
): Promise<ApiTableUser> {
  // Backend expects user_id as query parameter
  return this.request<ApiTableUser>(
    `/api/restaurants/${restaurantSlug}/tables/${tableNumber}/users?user_id=${encodeURIComponent(userId)}`,
    {
      method: 'POST',
      body: JSON.stringify({ name: userName }),
    }
  );
}

async updateTableUserName(
  restaurantSlug: string,
  tableNumber: number,
  userId: string,
  userName: string
): Promise<ApiTableUser> {
  return this.request<ApiTableUser>(
    `/api/restaurants/${restaurantSlug}/tables/${tableNumber}/users/${userId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ name: userName }),
    }
  );
}
```

**Note:** The backend expects `user_id` as a query parameter for POST, but you may need to adjust this based on your backend implementation.

### 2. Replace localStorage with Backend Sync in `App.tsx`

#### A. Replace Table Users State Management

**Current (localStorage only):**
```typescript
const [tableUsers, setTableUsers] = useState<TableUser[]>(() => {
  if (tableId) {
    const stored = localStorage.getItem(`gus_table_${tableId}`);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
});
```

**New (Backend sync):**
```typescript
const [tableUsers, setTableUsers] = useState<TableUser[]>([]);
const [isLoadingTableUsers, setIsLoadingTableUsers] = useState(false);

// Load table users from backend
const loadTableUsers = async () => {
  if (!tableId || !resKey) return;
  
  try {
    setIsLoadingTableUsers(true);
    const users = await apiService.getTableUsers(resKey, parseInt(tableId));
    setTableUsers(users.map(u => ({
      id: u.id,
      name: u.name,
      joinedAt: new Date(u.joined_at).getTime(),
    })));
  } catch (error) {
    console.error('Failed to load table users:', error);
  } finally {
    setIsLoadingTableUsers(false);
  }
};

// Load on mount and when tableId changes
useEffect(() => {
  if (tableId) {
    loadTableUsers();
  }
}, [tableId, resKey]);
```

#### B. Update Join Table Function

**Current:**
```typescript
const handleJoinTable = () => {
  if (tableId && currentUserName) {
    const userExists = tableUsers.find(u => u.id === currentUserId);
    if (!userExists) {
      setTableUsers(prev => [...prev, {
        id: currentUserId,
        name: currentUserName,
        joinedAt: Date.now(),
      }]);
    }
  }
};
```

**New:**
```typescript
const handleJoinTable = async () => {
  if (!tableId || !currentUserName || !resKey) return;
  
  try {
    await apiService.joinTable(resKey, parseInt(tableId), currentUserId, currentUserName);
    await loadTableUsers(); // Refresh list
  } catch (error) {
    console.error('Failed to join table:', error);
    alert('Error joining table. Please try again.');
  }
};
```

#### C. Update Name Change Function

**Current:**
```typescript
const handleNameChange = (name: string) => {
  setCurrentUserName(name);
  if (tableId) {
    setTableUsers(prev => {
      const existing = prev.find(u => u.id === currentUserId);
      if (existing) {
        return prev.map(u => u.id === currentUserId ? { ...u, name } : u);
      }
      return [...prev, { id: currentUserId, name, joinedAt: Date.now() }];
    });
  }
};
```

**New:**
```typescript
const handleNameChange = async (name: string) => {
  setCurrentUserName(name);
  
  if (tableId && resKey) {
    try {
      // If user is already at table, update via API
      const existingUser = tableUsers.find(u => u.id === currentUserId);
      if (existingUser) {
        await apiService.updateTableUserName(resKey, parseInt(tableId), currentUserId, name);
      } else {
        // If not at table yet, join table
        await apiService.joinTable(resKey, parseInt(tableId), currentUserId, name);
      }
      await loadTableUsers(); // Refresh list
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  }
};
```

### 3. Add Polling for Real-Time Updates

Add a polling mechanism to check for changes every few seconds:

```typescript
// Polling interval (e.g., every 3 seconds)
const POLL_INTERVAL = 3000;

useEffect(() => {
  if (!tableId || !resKey) return;

  const pollInterval = setInterval(async () => {
    // Poll for table users
    await loadTableUsers();
    
    // Poll for orders (if you want to sync orders too)
    await loadTableOrder();
  }, POLL_INTERVAL);

  return () => clearInterval(pollInterval);
}, [tableId, resKey]);
```

### 4. Sync Orders from Backend

Currently, orders are stored locally. To see other users' orders:

```typescript
// Load order from backend
const loadTableOrder = async () => {
  if (!tableId || !resKey) return;
  
  try {
    const order = await apiService.getTableOrder(resKey, parseInt(tableId));
    
    if (order) {
      // Convert backend order items to frontend CartItem format
      const orderItems: CartItem[] = order.items.map(item => {
        // You'll need to map menu_item_id (UUID) back to frontend ID
        const frontendId = getFrontendMenuItemId(item.menu_item_id);
        return {
          id: frontendId,
          name: getMenuItemName(frontendId), // You'll need a lookup function
          price: item.unit_price / 100, // Convert cents to currency
          quantity: item.quantity,
          orderedBy: item.ordered_by,
          // ... other fields
        };
      });
      
      // Merge with local cart (or replace, depending on your logic)
      setConfirmedItems(orderItems);
    }
  } catch (error) {
    console.error('Failed to load table order:', error);
  }
};
```

**Note:** You'll need to create a reverse mapping from backend UUIDs to frontend IDs, or store the frontend ID in the order items.

### 5. Update OrderSummary to Show All Users' Orders

In `OrderSummary.tsx`, you already have `tableUsers` prop. You can group items by `orderedBy`:

```typescript
// Group items by user
const itemsByUser = confirmedItems.reduce((acc, item) => {
  const userId = item.orderedBy || 'unknown';
  if (!acc[userId]) acc[userId] = [];
  acc[userId].push(item);
  return acc;
}, {} as Record<string, CartItem[]>);

// Display grouped by user
{Object.entries(itemsByUser).map(([userId, items]) => {
  const user = tableUsers.find(u => u.id === userId);
  return (
    <div key={userId}>
      <h3>{user?.name || 'Unknown'}</h3>
      {/* Render items */}
    </div>
  );
})}
```

## Alternative: WebSocket/Server-Sent Events (SSE)

For true real-time updates (no polling delay), you could implement:

1. **WebSocket connection** - More complex, bidirectional
2. **Server-Sent Events (SSE)** - Simpler, server-to-client only

This would require:
- Backend WebSocket/SSE endpoint
- Frontend WebSocket/EventSource client
- Connection management (reconnect on disconnect)

## Implementation Priority

1. **Phase 1 (Basic Sync):**
   - Add table user API methods
   - Replace localStorage with backend calls
   - Add polling (3-5 second interval)

2. **Phase 2 (Order Sync):**
   - Sync orders from backend
   - Display all users' orders in OrderSummary

3. **Phase 3 (Real-Time):**
   - Implement WebSocket/SSE for instant updates
   - Remove polling

## Testing

1. Open two browser windows/tabs
2. Both go to `http://localhost:3000/?res=olivegarden&table=1`
3. Set different names (Tomas, Michelle)
4. Place orders in each window
5. Verify both windows see:
   - Each other's names in the table users panel
   - Each other's orders in the order summary

## Backend Note

The backend endpoint for joining a table currently expects `user_id` as a function parameter. You may need to:

**Option 1:** Modify the backend to accept `user_id` as a query parameter:
```python
from fastapi import Query

async def join_table(
    restaurant_id: str,
    table_number: int,
    user_data: TableUserJoin,
    user_id: str = Query(..., description="User ID"),  # Add Query()
    db: AsyncSession = Depends(get_db)
):
```

**Option 2:** Or modify the backend to accept it in the request body:
```python
class TableUserJoin(BaseModel):
    name: str
    user_id: str  # Add user_id to the model
```

Then call it as:
```typescript
body: JSON.stringify({ name: userName, user_id: userId })
```

**Option 3:** Use a custom dependency or header (more complex, for production auth)
