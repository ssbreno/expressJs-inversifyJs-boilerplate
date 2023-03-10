import express from 'express';
import { createCategoryHandler } from '../application/controllers/category/category.controller';

const router = express.Router();

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     tags:
 *       - "Category"
 *     description: "Add Category"
 *     operationId: controller.addCategory
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Category Response
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
router.route('/create').post(createCategoryHandler);

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
router.get('/api/products/get/:id');

export default router;
