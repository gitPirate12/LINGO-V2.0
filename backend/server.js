const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const PostRoutes = require('./routes/posts');
const ReplyRoutes = require('./routes/replies');
const userRoutes = require('./routes/users');
const emojiRouter = require('./routes/emoji');
const wordRoutes = require('./routes/words');


// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// Routes
app.use('/api/posts', PostRoutes);
app.use('/api/replies', ReplyRoutes);
app.use('/api/users', userRoutes);
app.use('/emoji', emojiRouter);
app.use('/api/culture',wordRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connection Success! ✅');
    // Start server after successful database connection
    const PORT = process.env.PORT || 3040;
    app.listen(PORT, () => {
      console.log(`🚀 Server is up and running on port number : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
