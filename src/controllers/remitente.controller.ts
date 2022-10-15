import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Remitente} from '../models';
import {RemitenteRepository} from '../repositories';

export class RemitenteController {
  constructor(
    @repository(RemitenteRepository)
    public remitenteRepository : RemitenteRepository,
  ) {}

  @post('/remitentes')
  @response(200, {
    description: 'Remitente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Remitente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remitente, {
            title: 'NewRemitente',
            exclude: ['id'],
          }),
        },
      },
    })
    remitente: Omit<Remitente, 'id'>,
  ): Promise<Remitente> {
    return this.remitenteRepository.create(remitente);
  }

  @get('/remitentes/count')
  @response(200, {
    description: 'Remitente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Remitente) where?: Where<Remitente>,
  ): Promise<Count> {
    return this.remitenteRepository.count(where);
  }

  @get('/remitentes')
  @response(200, {
    description: 'Array of Remitente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Remitente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Remitente) filter?: Filter<Remitente>,
  ): Promise<Remitente[]> {
    return this.remitenteRepository.find(filter);
  }

  @patch('/remitentes')
  @response(200, {
    description: 'Remitente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remitente, {partial: true}),
        },
      },
    })
    remitente: Remitente,
    @param.where(Remitente) where?: Where<Remitente>,
  ): Promise<Count> {
    return this.remitenteRepository.updateAll(remitente, where);
  }

  @get('/remitentes/{id}')
  @response(200, {
    description: 'Remitente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Remitente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Remitente, {exclude: 'where'}) filter?: FilterExcludingWhere<Remitente>
  ): Promise<Remitente> {
    return this.remitenteRepository.findById(id, filter);
  }

  @patch('/remitentes/{id}')
  @response(204, {
    description: 'Remitente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remitente, {partial: true}),
        },
      },
    })
    remitente: Remitente,
  ): Promise<void> {
    await this.remitenteRepository.updateById(id, remitente);
  }

  @put('/remitentes/{id}')
  @response(204, {
    description: 'Remitente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() remitente: Remitente,
  ): Promise<void> {
    await this.remitenteRepository.replaceById(id, remitente);
  }

  @del('/remitentes/{id}')
  @response(204, {
    description: 'Remitente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.remitenteRepository.deleteById(id);
  }
}
