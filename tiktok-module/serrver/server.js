const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');
const MainRouter = require('./routes/MainRouter'); // Import routes

const app = express();
const PORT = 8000;

// Sử dụng middleware CORS
app.use(cors());

// Sử dụng body-parser để xử lý JSON
app.use(bodyParser.json());

// Sử dụng các route
app.use('/', MainRouter); // Đảm bảo bạn đã thêm route này
app.use('/avatars', express.static(path.join(__dirname, './TiktokModule/DB/User/DefaultUser/avatars')));


// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
