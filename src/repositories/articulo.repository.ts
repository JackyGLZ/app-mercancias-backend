import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Articulo, ArticuloRelations} from '../models';

export class ArticuloRepository extends DefaultCrudRepository<
  Articulo,
  typeof Articulo.prototype.id,
  ArticuloRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Articulo, dataSource);
  }
}
