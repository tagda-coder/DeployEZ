// ====== ENTRY POINT OF THE APP TO START THE SERVER ======
import "dotenv/config";
import app from "./src/app.js";
import cors from "cors";

// Enable CORS for all routes
app.use(cors({
  origin:["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
