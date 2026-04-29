// ====== ENTRY POINT OF THE APP TO START THE SERVER ======
require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
