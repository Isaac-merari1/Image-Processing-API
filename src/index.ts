import express from 'express';
import mainRoute from './routes/app_route';
import process from 'process';

const app = express();
const port = process.env.PORT || 3000;
app.use('/api', mainRoute);

app.listen(port || 3000, () => {
  console.log(`server is running at https://localhost:${port}`);
});

export default app;
