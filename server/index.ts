// server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';

dotenv.config(); // ✅ Correct

const app = express();
app.use(cors());
app.use(express.json());

app.post('/address', async (req, res) => {
  const { name, line1, line2, line3, phone, pincode } = req.body;
  try {
    await pool.query(
      'INSERT INTO address (name, line1, line2, line3, phone, pincode) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, line1, line2, line3, phone, pincode]
    );
    res.status(200).json({ 
      message: 'Address saved successfully',
      name,
      line1,
      line2,
      line3,
      phone,
      pincode
    });
  } catch (err) {
    console.error('❌ DB Error on /address:', err);
    res.status(500).json({ message: 'Failed to save address' });
  }
});

app.get('/address', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM address ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ DB Error on /address GET:', err);
    res.status(500).json({ message: 'Failed to fetch address' });
  }
});

app.get('/order-status/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`🔍 Looking for order with ID: ${id}`);
  try {
    const result = await pool.query(
      'SELECT status FROM orders WHERE id = $1',
      [id]
    );
    console.log(`📊 Database query result:`, result.rows);
    
    if (result.rows.length > 0) {
      console.log(`✅ Found order ${id} with status: ${result.rows[0].status}`);
      res.json({ status: result.rows[0].status });
    } else {
      console.log(`❌ Order ${id} not found in database`);
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    console.error('❌ DB Error on /order-status:', err);
    res.status(500).json({ message: 'Failed to fetch status' });
  }
});

const statusFlow = ['Order Placed', 'Preparing', 'Picked by Delivery Partner', 'On the Way', 'Delivered'];

// Helper function to generate order ID
function generateOrderId() {
  return Math.random().toString(36).substring(2, 10);
}

app.post('/place-order', async (req, res) => {
  try {
    const orderId = generateOrderId();
    await pool.query(`INSERT INTO orders (id, status) VALUES ($1, $2)`, [orderId, 'Order Placed']);
    console.log(`🎯 Order created: ${orderId} with status 'Order Placed'`);

    let i = 0;
    console.log(`🚀 Starting status simulation for order ${orderId}`);
    
    const interval = setInterval(async () => {
      if (i < statusFlow.length) {
        try {
          await pool.query(`UPDATE orders SET status = $1 WHERE id = $2`, [statusFlow[i], orderId]);
          console.log(`✅ Status updated to ${statusFlow[i]} for order ${orderId}`);
        } catch (updateErr) {
          console.error(`❌ Error updating status for order ${orderId}:`, updateErr);
        }
        i++;
      } else {
        console.log(`🎉 Order ${orderId} simulation complete - Delivered!`);
        clearInterval(interval);
      }
    }, 15000); // every 15 seconds

    res.json({ 
      orderId: orderId,
      status: "Order Placed",
      message: "Order placed successfully"
    });
  } catch (err) {
    console.error('❌ Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});
