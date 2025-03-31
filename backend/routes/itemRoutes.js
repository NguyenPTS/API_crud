const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Lấy danh sách tất cả items (chưa bị disable)
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Danh sách items
 */
router.get("/", async (req, res) => {
    try {
        const items = await Item.findAll({
            // where: { disable: false } // Chỉ lấy item chưa bị disable
            paranoid: false
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/items/deleted:
 *   get:
 *     summary: Lấy danh sách các item đã bị disable (xóa mềm)
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Danh sách item đã bị disable
 */
router.get("/deleted", async (req, res) => {
    try {
        const deletedItems = await Item.findAll({
            where: { disable: true } // Chỉ lấy item đã bị disable
        });
        res.json(deletedItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Lấy item theo ID (bao gồm cả bị disable)
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của item
 *     responses:
 *       200:
 *         description: Thông tin item
 *       404:
 *         description: Item không tồn tại
 */
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findOne({
            where: { id: req.params.id },
            paranoid: false // Lấy cả item bị soft delete
        });

        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Cập nhật thông tin item theo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item đã được cập nhật
 *       404:
 *         description: Không tìm thấy item
 */
router.put("/:id", async (req, res) => {
    try {
        const { name, price } = req.body;
        const item = await Item.findByPk(req.params.id);

        if (!item) return res.status(404).json({ error: "Item not found" });

        await item.update({ name, price });
        res.json({ message: "Item updated successfully", item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Tạo mới một item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item được tạo thành công
 */
router.post("/", async (req, res) => {
    try {
        const { name, price } = req.body;
        const newItem = await Item.create({ name, price, disable: false });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Xóa mềm item theo ID (disable)
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item đã bị disable (soft delete)
 *       404:
 *         description: Không tìm thấy item
 */
router.delete("/:id", async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, { paranoid: false });

        if (!item) return res.status(404).json({ error: "Item not found" });

        // Cập nhật disable = true và deletedAt = thời gian hiện tại, có where id
        await Item.update(
            { disable: true, deletedAt: new Date() },
            { where: { id: req.params.id } }
        );

        // Lấy lại item sau khi cập nhật
        const updatedItem = await Item.findByPk(req.params.id, { paranoid: false });

        res.json({
            message: `Item with ID ${req.params.id} soft deleted successfully`,
            deletedAt: updatedItem.deletedAt,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




/**
 * @swagger
 * /api/items/hard/{id}:
 *   delete:
 *     summary: Xóa vĩnh viễn item theo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item đã bị xóa hoàn toàn
 *       404:
 *         description: Không tìm thấy item
 */
router.delete("/hard/:id", async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, { paranoid: false });
        if (!item) return res.status(404).json({ error: "Item not found" });

        await item.destroy({ force: true }); // Hard delete
        res.json({ message: "Item permanently deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
/**
 * @swagger
 * /api/items/all:
 *   get:
 *     summary: Lấy danh sách tất cả items (bao gồm cả đã bị disable)
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Danh sách tất cả items
 */
router.get("/all", async (req, res) => {
    try {
        const allItems = await Item.findAll({
            paranoid: false // Lấy cả items bị soft delete
        });
        res.json(allItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});