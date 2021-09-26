const port = 5000;

import app from './app';

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
