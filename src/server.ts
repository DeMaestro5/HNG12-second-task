import app from './app';

const PORT = process.env.PORT || 8888;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
