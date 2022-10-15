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
import {Mercancia} from '../models';
import {MercanciaRepository} from '../repositories';

export class MercanciaController {
  constructor(
    @repository(MercanciaRepository)
    public mercanciaRepository : MercanciaRepository,
  ) {}

  @post('/mercancias')
  @response(200, {
    description: 'Mercancia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mercancia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercancia, {
            title: 'NewMercancia',
            exclude: ['id'],
          }),
        },
      },
    })
    mercancia: Omit<Mercancia, 'id'>,
  ): Promise<Mercancia> {
    return this.mercanciaRepository.create(mercancia);
  }

  @get('/mercancias/count')
  @response(200, {
    description: 'Mercancia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mercancia) where?: Where<Mercancia>,
  ): Promise<Count> {
    return this.mercanciaRepository.count(where);
  }

  @get('/mercancias')
  @response(200, {
    description: 'Array of Mercancia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mercancia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mercancia) filter?: Filter<Mercancia>,
  ): Promise<Mercancia[]> {
    return this.mercanciaRepository.find(filter);
  }

  @patch('/mercancias')
  @response(200, {
    description: 'Mercancia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercancia, {partial: true}),
        },
      },
    })
    mercancia: Mercancia,
    @param.where(Mercancia) where?: Where<Mercancia>,
  ): Promise<Count> {
    return this.mercanciaRepository.updateAll(mercancia, where);
  }

  @get('/mercancias/{id}')
  @response(200, {
    description: 'Mercancia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mercancia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mercancia, {exclude: 'where'}) filter?: FilterExcludingWhere<Mercancia>
  ): Promise<Mercancia> {
    return this.mercanciaRepository.findById(id, filter);
  }

  @patch('/mercancias/{id}')
  @response(204, {
    description: 'Mercancia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercancia, {partial: true}),
        },
      },
    })
    mercancia: Mercancia,
  ): Promise<void> {
    await this.mercanciaRepository.updateById(id, mercancia);
  }

  @put('/mercancias/{id}')
  @response(204, {
    description: 'Mercancia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mercancia: Mercancia,
  ): Promise<void> {
    await this.mercanciaRepository.replaceById(id, mercancia);
  }

  @del('/mercancias/{id}')
  @response(204, {
    description: 'Mercancia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mercanciaRepository.deleteById(id);
  }
}
