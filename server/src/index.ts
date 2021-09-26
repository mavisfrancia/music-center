import 'module-alias/register';
import app from '$app';

const port = 5000;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
