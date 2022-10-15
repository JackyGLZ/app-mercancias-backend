import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Remitente} from './remitente.model';
import {Articulo} from './articulo.model';

@model()
export class Mercancia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_articulo: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @belongsTo(() => Remitente)
  remitenteId: string;

  @hasOne(() => Articulo)
  articulo: Articulo;

  constructor(data?: Partial<Mercancia>) {
    super(data);
  }
}

export interface MercanciaRelations {
  // describe navigational properties here
}

export type MercanciaWithRelations = Mercancia & MercanciaRelations;
