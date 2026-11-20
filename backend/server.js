
const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./config/db");


// Test PostgreSQL connection
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database(), current_user"
        );

        res.json({
            message: "Database connection successful!",
            database: result.rows[0].current_database,
            user: result.rows[0].current_user
        });

    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            message: "Database connection failed."
        });
    }
});

// Product routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Ceylora backend server running on port ${PORT}`);
});
