import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mercancia, MercanciaRelations, Remitente, Articulo} from '../models';
import {RemitenteRepository} from './remitente.repository';
import {ArticuloRepository} from './articulo.repository';

export class MercanciaRepository extends DefaultCrudRepository<
  Mercancia,
  typeof Mercancia.prototype.id,
  MercanciaRelations
> {

  public readonly remitente: BelongsToAccessor<Remitente, typeof Mercancia.prototype.id>;

  public readonly articulo: HasOneRepositoryFactory<Articulo, typeof Mercancia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RemitenteRepository') protected remitenteRepositoryGetter: Getter<RemitenteRepository>, @repository.getter('ArticuloRepository') protected articuloRepositoryGetter: Getter<ArticuloRepository>,
  ) {
    super(Mercancia, dataSource);
    this.articulo = this.createHasOneRepositoryFactoryFor('articulo', articuloRepositoryGetter);
    this.registerInclusionResolver('articulo', this.articulo.inclusionResolver);
    this.remitente = this.createBelongsToAccessorFor('remitente', remitenteRepositoryGetter,);
    this.registerInclusionResolver('remitente', this.remitente.inclusionResolver);
  }
}
