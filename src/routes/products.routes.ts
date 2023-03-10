import express from 'express';
//import * as controllerProducts from '../application/controllers/products/products.controller';

const router = express.Router();

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     tags:
 *       - "Products"
 *     description: "Add Product"
 *     operationId: controllerProducts.addProduct
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Product Response
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

module.exports = router;
