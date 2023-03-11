import { BaseController } from '../../../common/controllers/base.controller';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CategoryDTO } from '../../../domain/dto/category.dto';
import { CategoryService } from '../../business/category/category.service';
import { BodyRequest } from '../../../common/interface/body.interface';
import { StatusHelper } from '../../../common/helpers/status.helper';

@injectable()
export class CategoryController extends BaseController {
  @inject(CategoryService) private readonly categoryService: CategoryService;

  constructor() {
    super('/category');
  }

  public initializeRoutes(): void {
    this.router
      .post(`${this.path}/create`, this.createCategory.bind(this))
      .get(`${this.path}/:id`, this.getCategory.bind(this))
      .put(`${this.path}/:id`, this.updateCategory.bind(this))
      .get(this.path, this.getAllCategory.bind(this))
      .delete(`${this.path}/:id`, this.deleteCategory.bind(this));
  }

  public async getCategory(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const data = await this.categoryService.findCategoryById(id);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async createCategory(
    request: BodyRequest<CategoryDTO>,
    response: Response,
  ) {
    try {
      const dto = request.body as CategoryDTO;
      const data = await this.categoryService.createCategory(dto);
      response
        .location(`${this.path}/${data.name}`)
        .status(StatusHelper.status201Created)
        .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async deleteCategory(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const data = await this.categoryService.deleteCategory(id);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async updateCategory(
    request: BodyRequest<CategoryDTO>,
    response: Response,
  ) {
    try {
      const dto = request.body as CategoryDTO;
      const data = await this.categoryService.updateCategory(dto);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async getAllCategory(request: Request, response: Response) {
    try {
      const data = await this.categoryService.getAllCategory(request.query);
      response.send(data);
    } catch (err) {
      throw err;
    }
  }
}
