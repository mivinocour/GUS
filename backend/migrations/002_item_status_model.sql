-- Update schema to use item-level status instead of order-level status
-- This allows individual items to progress independently while keeping them in one order

-- Add status column to order_items
ALTER TABLE order_items ADD COLUMN status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled'));

-- Add index for performance on item status
CREATE INDEX idx_order_items_status ON order_items(status);
CREATE INDEX idx_order_items_order_status ON order_items(order_id, status);

-- Remove status constraint from orders table
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Drop the status column from orders (keep total_amount and notes)
ALTER TABLE orders DROP COLUMN IF EXISTS status;

-- Add a function to calculate order summary information
CREATE OR REPLACE FUNCTION get_order_summary(order_uuid UUID)
RETURNS TABLE (
    total_items INTEGER,
    pending_items INTEGER,
    served_items INTEGER,
    cancelled_items INTEGER,
    all_served BOOLEAN,
    has_pending BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::INTEGER as total_items,
        COUNT(*) FILTER (WHERE status IN ('pending', 'confirmed', 'preparing', 'ready'))::INTEGER as pending_items,
        COUNT(*) FILTER (WHERE status = 'served')::INTEGER as served_items,
        COUNT(*) FILTER (WHERE status = 'cancelled')::INTEGER as cancelled_items,
        (COUNT(*) FILTER (WHERE status = 'served') = COUNT(*) FILTER (WHERE status != 'cancelled'))::BOOLEAN as all_served,
        (COUNT(*) FILTER (WHERE status IN ('pending', 'confirmed', 'preparing', 'ready')) > 0)::BOOLEAN as has_pending
    FROM order_items
    WHERE order_id = order_uuid;
END;
$$ LANGUAGE plpgsql;