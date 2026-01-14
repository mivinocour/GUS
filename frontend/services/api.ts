/**
 * API service for backend communication
 */

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiRestaurant {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  colors: Record<string, string>;
}

export interface ApiRestaurantData {
  name: string;
  logo: string | null;
  colors: Record<string, string>;
  recommendations: ApiMenuItem[];
  menu: ApiCategory[];
}

export interface ApiMenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // Price in currency (not cents)
  image: string;
  category: string;
}

export interface ApiCategory {
  id: string;
  title: string;
  items: ApiMenuItem[];
}

export interface ApiOrderItem {
  menu_item_id: string;
  quantity: number;
  notes?: string;
  ordered_by: string;
}

export interface ApiOrderCreate {
  table_id?: string;        // Backend requires table UUID (optional)
  items: ApiOrderItem[];
  notes?: string;
}

export interface ApiOrderResponse {
  id: string;
  restaurant_id: string;
  table_id?: string;
  order_number: number;
  total_amount: number; // In cents
  notes?: string;
  created_at: string;
  items: Array<{
    id: string;
    menu_item_id: string;
    quantity: number;
    unit_price: number; // In cents
    total_price: number; // In cents
    notes?: string;
    ordered_by: string;
    status: string;
  }>;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Try to get error details from response body
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorBody = await response.json();
          if (errorBody.detail) {
            errorMessage += ` - ${JSON.stringify(errorBody.detail)}`;
          }
        } catch (e) {
          // If response is not JSON, use status text
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Restaurant endpoints
  async getRestaurants(): Promise<ApiRestaurant[]> {
    return this.request<ApiRestaurant[]>('/api/restaurants');
  }

  async getRestaurant(slug: string): Promise<ApiRestaurantData> {
    return this.request<ApiRestaurantData>(`/api/restaurants/${slug}`);
  }

  // Order endpoints (matching existing backend patterns)
  async createOrder(
    restaurantSlug: string,
    tableNumber: number,
    orderData: ApiOrderCreate  // Keep full interface - backend needs restaurant_id and table_id
  ): Promise<ApiOrderResponse> {
    return this.request<ApiOrderResponse>(
      `/api/restaurants/${restaurantSlug}/tables/${tableNumber}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getTableOrder(restaurantSlug: string, tableNumber: number): Promise<ApiOrderResponse | null> {
    return this.request<ApiOrderResponse | null>(
      `/api/restaurants/${restaurantSlug}/tables/${tableNumber}/orders`
    );
  }

  async completeOrder(restaurantSlug: string, orderId: string): Promise<{success: boolean, message: string}> {
    return this.request<{success: boolean, message: string}>(
      `/api/restaurants/${restaurantSlug}/orders/${orderId}/complete`, {
      method: 'PUT',
    });
  }

  // Get restaurant and table UUIDs for order creation
  async getRestaurantAndTableIds(restaurantSlug: string, tableNumber: number | null): Promise<{restaurantId: string, tableId: string | null}> {
    // The backend endpoints expect restaurant slug directly for restaurant lookup
    // For table ID, we'll use the restaurantSlug in the API call and let backend handle the lookup

    // Return values that work with existing endpoint structure
    return {
      restaurantId: restaurantSlug, // Backend accepts slug in URL and does lookup
      tableId: tableNumber ? `table-${tableNumber}` : null // Simple ID format for now
    };
  }

  // Health check
  async healthCheck(): Promise<{ status: string; database: string }> {
    return this.request<{ status: string; database: string }>('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Helper function to convert frontend cart items to API format
export function convertCartItemsToApiFormat(
  cartItems: any[],
  currentUserId: string,
  menuItemsMap: Map<string, string> // Map from frontend ID to backend UUID
): ApiOrderItem[] {
  return cartItems.map(item => ({
    menu_item_id: menuItemsMap.get(item.id) || item.id,
    quantity: item.quantity,
    notes: item.notes || undefined,
    ordered_by: currentUserId,
  }));
}

// Helper function to convert API restaurant data to frontend format
export function convertApiRestaurantToFrontend(apiData: ApiRestaurantData) {
  return {
    name: apiData.name,
    logo: apiData.logo,
    colors: apiData.colors,
    recommendations: apiData.recommendations.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Math.round(item.price * 100), // Convert to cents for frontend
      category: item.category,
      image: item.image,
    })),
    menu: apiData.menu.map(category => ({
      id: category.id,
      title: category.title,
      items: category.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: Math.round(item.price * 100), // Convert to cents for frontend
        image: item.image,
        category: item.category,
      })),
    })),
  };
}