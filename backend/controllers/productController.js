
const pool = require("../config/db");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                productid,
                product_name,
                description,
                stock_quantity,
                local_price,
                international_price
            FROM products
            ORDER BY productid;
        `);

        res.status(200).json({
            success: true,
            count: result.rows.length,
            products: result.rows
        });

    } catch (error) {
        console.error("Error fetching products:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve products."
        });
    }
};

// Get one product by ID
const getProductById = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID."
            });
        }

        const result = await pool.query(
            `SELECT
                productid,
                product_name,
                description,
                stock_quantity,
                local_price,
                international_price
             FROM products
             WHERE productid = $1`,
            [productId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            product: result.rows[0]
        });

    } catch (error) {
        console.error("Error fetching product:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve product."
        });
    }
};

// Export controller functions
module.exports = {
    getAllProducts,
    getProductById
};
