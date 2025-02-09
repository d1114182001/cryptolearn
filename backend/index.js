const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bitcore = require('bitcore-lib');
const app = express();
const port =5000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blockchaintest'
}).promise();



app.post('/create-wallet', async (req, res) => {
    try {
        const privateKey = new bitcore.PrivateKey();
        const publicKey = privateKey.toPublicKey().toString();
        const address = privateKey.toAddress().toString();

        await pool.query(
            'INSERT INTO wallets (address, public_key, private_key) VALUES (?, ?, ?)',
            [address, publicKey, privateKey.toString()]
        );

        res.json({ address, publicKey, privateKey: privateKey.toString() });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create wallet.' });
    }
});

app.get("/wallets", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM wallets");  // 使用 Promise 版本的 query
      res.json(rows);  // 返回資料
    } catch (err) {
      console.error("資料庫錯誤:", err);
      res.status(500).json({ error: err.message });  // 錯誤處理
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });