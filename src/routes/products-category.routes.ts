import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/products-category/create:
 *   post:
 *     tags:
 *       - "Products Category"
 *     description: "Add Product Category"
 *     operationId: controllerProducts.addProductCategory
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Product Category Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message = Invalid request
 *                 status:
 *                   type: string
 *                   description: Status = failure
 */
router.post('/api/products/create');

/**
 * @swagger
 * /api/products-category/get:
 *   get:
 *     tags:
 *       - "Products Category"
 *     description: "Add Product Category"
 *     operationId: controllerProducts.addProductCategory
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Product Category Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message = Invalid request
 *                 status:
 *                   type: string
 *                   description: Status = failure
 */
router.get('/api/products/create');

module.exports = router;
