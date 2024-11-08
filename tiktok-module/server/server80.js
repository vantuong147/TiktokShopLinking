const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Sử dụng promises để dễ quản lý async/await
const webhookRouter = require('./controllers/WebhookController'); // Import routes

const app = express();
const PORT = 80;

// Sử dụng middleware CORS
app.use(cors());

// Sử dụng body-parser để xử lý JSON
app.use(bodyParser.json());

// Sử dụng các route
app.use('/webhook', webhookRouter.router); // Đảm bảo bạn đã thêm route này


// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
