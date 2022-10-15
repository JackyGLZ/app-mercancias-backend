import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mercancia} from './mercancia.model';

@model()
export class Remitente extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Mercancia)
  mercancias: Mercancia[];

  constructor(data?: Partial<Remitente>) {
    super(data);
  }
}

export interface RemitenteRelations {
  // describe navigational properties here
}

export type RemitenteWithRelations = Remitente & RemitenteRelations;
