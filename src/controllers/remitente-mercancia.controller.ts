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
  Remitente,
  Mercancia,
} from '../models';
import {RemitenteRepository} from '../repositories';

export class RemitenteMercanciaController {
  constructor(
    @repository(RemitenteRepository) protected remitenteRepository: RemitenteRepository,
  ) { }

  @get('/remitentes/{id}/mercancias', {
    responses: {
      '200': {
        description: 'Array of Remitente has many Mercancia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mercancia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mercancia>,
  ): Promise<Mercancia[]> {
    return this.remitenteRepository.mercancias(id).find(filter);
  }

  @post('/remitentes/{id}/mercancias', {
    responses: {
      '200': {
        description: 'Remitente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mercancia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Remitente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercancia, {
            title: 'NewMercanciaInRemitente',
            exclude: ['id'],
            optional: ['remitenteId']
          }),
        },
      },
    }) mercancia: Omit<Mercancia, 'id'>,
  ): Promise<Mercancia> {
    return this.remitenteRepository.mercancias(id).create(mercancia);
  }

  @patch('/remitentes/{id}/mercancias', {
    responses: {
      '200': {
        description: 'Remitente.Mercancia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercancia, {partial: true}),
        },
      },
    })
    mercancia: Partial<Mercancia>,
    @param.query.object('where', getWhereSchemaFor(Mercancia)) where?: Where<Mercancia>,
  ): Promise<Count> {
    return this.remitenteRepository.mercancias(id).patch(mercancia, where);
  }

  @del('/remitentes/{id}/mercancias', {
    responses: {
      '200': {
        description: 'Remitente.Mercancia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mercancia)) where?: Where<Mercancia>,
  ): Promise<Count> {
    return this.remitenteRepository.mercancias(id).delete(where);
  }
}
