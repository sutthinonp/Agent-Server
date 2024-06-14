const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const agentSupportRoutes = require('./routes/agentSupportRoutes');
const imageRoutes = require('./routes/imageRoutes');
const agentUserRoutes = require('./routes/agentUserRoutes');

app.use('/api/agent-support', agentSupportRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/agent-users', agentUserRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
