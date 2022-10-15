import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mercancia,
  Articulo,
} from '../models';
import {MercanciaRepository} from '../repositories';

export class MercanciaArticuloController {
  constructor(
    @repository(MercanciaRepository) protected mercanciaRepository: MercanciaRepository,
  ) { }

  @get('/mercancias/{id}/articulo', {
    responses: {
      '200': {
        description: 'Mercancia has one Articulo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Articulo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Articulo>,
  ): Promise<Articulo> {
    return this.mercanciaRepository.articulo(id).get(filter);
  }

  @post('/mercancias/{id}/articulo', {
    responses: {
      '200': {
        description: 'Mercancia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Articulo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mercancia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulo, {
            title: 'NewArticuloInMercancia',
            exclude: ['id'],
            optional: ['mercanciaId']
          }),
        },
      },
    }) articulo: Omit<Articulo, 'id'>,
  ): Promise<Articulo> {
    return this.mercanciaRepository.articulo(id).create(articulo);
  }

  @patch('/mercancias/{id}/articulo', {
    responses: {
      '200': {
        description: 'Mercancia.Articulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulo, {partial: true}),
        },
      },
    })
    articulo: Partial<Articulo>,
    @param.query.object('where', getWhereSchemaFor(Articulo)) where?: Where<Articulo>,
  ): Promise<Count> {
    return this.mercanciaRepository.articulo(id).patch(articulo, where);
  }

  @del('/mercancias/{id}/articulo', {
    responses: {
      '200': {
        description: 'Mercancia.Articulo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Articulo)) where?: Where<Articulo>,
  ): Promise<Count> {
    return this.mercanciaRepository.articulo(id).delete(where);
  }
}
