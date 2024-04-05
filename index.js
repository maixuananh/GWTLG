const express = require('express');
const { sequelize } = require('./models/index');
const app = express();
var cors = require('cors');
const router = require('./routes/index');

app.use(cors());

const PORT = process.env.PORT || 3567;

app.use(express.json());

app.use("/api", router); //http://localhost:3567/api

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa');
  })
  .catch((err) => {
    console.error('Lỗi đồng bộ hóa cơ sở dữ liệu:', err);
  });
