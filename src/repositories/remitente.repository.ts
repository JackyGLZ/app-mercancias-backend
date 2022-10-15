import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Remitente, RemitenteRelations, Mercancia} from '../models';
import {MercanciaRepository} from './mercancia.repository';

export class RemitenteRepository extends DefaultCrudRepository<
  Remitente,
  typeof Remitente.prototype.id,
  RemitenteRelations
> {

  public readonly mercancias: HasManyRepositoryFactory<Mercancia, typeof Remitente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MercanciaRepository') protected mercanciaRepositoryGetter: Getter<MercanciaRepository>,
  ) {
    super(Remitente, dataSource);
    this.mercancias = this.createHasManyRepositoryFactoryFor('mercancias', mercanciaRepositoryGetter,);
    this.registerInclusionResolver('mercancias', this.mercancias.inclusionResolver);
  }
}
