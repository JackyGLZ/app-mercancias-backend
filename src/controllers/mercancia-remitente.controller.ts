import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mercancia,
  Remitente,
} from '../models';
import {MercanciaRepository} from '../repositories';

export class MercanciaRemitenteController {
  constructor(
    @repository(MercanciaRepository)
    public mercanciaRepository: MercanciaRepository,
  ) { }

  @get('/mercancias/{id}/remitente', {
    responses: {
      '200': {
        description: 'Remitente belonging to Mercancia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Remitente)},
          },
        },
      },
    },
  })
  async getRemitente(
    @param.path.string('id') id: typeof Mercancia.prototype.id,
  ): Promise<Remitente> {
    return this.mercanciaRepository.remitente(id);
  }
}
