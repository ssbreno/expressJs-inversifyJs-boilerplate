import { Request, Response } from 'express';
import { CategoryDTO } from '../../../domain/dto/category.dto';
import { createCategory } from '../../business/category/category.service';

export const createCategoryHandler = async (
  req: Request<CategoryDTO>,
  res: Response,
) => {
  try {
    const categoryCreated = await createCategory(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        categoryCreated,
      },
    });
  } catch (err: any) {
    throw err;
  }
};
