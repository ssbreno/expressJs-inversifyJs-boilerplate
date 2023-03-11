import { BaseController } from '../../../common/controllers/base.controller';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ProductService } from '../../../application/business/products/products.service';
import { StatusHelper } from '../../../common/helpers/status.helper';
import { ProductDTO } from '../../../domain/dto/product.dto';
import { BodyRequest } from '../../../common/interface/body.interface';

@injectable()
export class ProductController extends BaseController {
  @inject(ProductService) private readonly productService: ProductService;

  constructor() {
    super('/product');
  }

  public initializeRoutes(): void {
    this.router
      .post(`${this.path}/create`, this.createProduct.bind(this))
      .get(`${this.path}/:id`, this.getProduct.bind(this))
      .put(`${this.path}/:id`, this.updateProduct.bind(this))
      .get(this.path, this.getAllProduct.bind(this))
      .delete(`${this.path}/:id`, this.deleteProduct.bind(this));
  }

  public async getProduct(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const data = await this.productService.findProductById(id);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async createProduct(
    request: BodyRequest<ProductDTO>,
    response: Response,
  ) {
    try {
      const dto = request.body as ProductDTO;
      const data = await this.productService.createProduct(dto);
      response
        .location(`${this.path}/${data.name}`)
        .status(StatusHelper.status201Created)
        .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async deleteProduct(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const data = await this.productService.deleteProduct(id);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async updateProduct(
    request: BodyRequest<ProductDTO>,
    response: Response,
  ) {
    try {
      const dto = request.body as ProductDTO;
      const data = await this.productService.updateProduct(dto);
      if (data)
        response
          .location(`${this.path}/${data.id}`)
          .status(StatusHelper.status200OK)
          .send(data);
    } catch (err) {
      throw err;
    }
  }

  public async getAllProduct(request: Request, response: Response) {
    try {
      const data = await this.productService.getAllProduct(request.query);
      response.send(data);
    } catch (err) {
      throw err;
    }
  }
}
