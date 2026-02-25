const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sql, config } = require("./db");

const app = express();

/* =========================
   1) MIDDLEWARE (FIRST)
========================= */
app.use(cors());
app.use(express.json()); // ✅ MUST be before API routes

/* =========================
   2) SERVE FRONTEND
========================= */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* =========================
   3) API ROUTES
========================= */

// ✅ Health check (for testing server)
app.get("/health", (req, res) => res.send("OK"));

// ✅ Seed User (run once)
app.post("/api/seed-user", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const pool = await sql.connect(config);
    const hash = await bcrypt.hash(password, 10);

    await pool.request()
      .input("Email", sql.NVarChar, email)
      .input("PasswordHash", sql.NVarChar, hash)
      .query("INSERT INTO Users (Email, PasswordHash) VALUES (@Email, @PasswordHash)");


    res.json({ ok: true, message: "User seeded successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await sql.connect(config);

    const result = await pool.request()
      .input("Email", sql.NVarChar, email)
      .query("SELECT TOP 1 * FROM Users WHERE Email=@Email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    const user = result.recordset[0];
    const ok = await bcrypt.compare(password, user.PasswordHash);

    if (!ok) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    res.json({
      ok: true,
      message: "Login successful",
      user: { fullName: user.FullName, email: user.Email }
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
});

/* =========================
   4) START SERVER (LAST)
========================= */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
