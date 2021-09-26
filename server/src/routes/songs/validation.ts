import Joi from 'joi';
import { CreateSongInput, Tempo } from '$types';

export const createSongSchema = Joi.object<CreateSongInput>({
  title: Joi.string().required(),
  artist: Joi.string(),
  tempo: Joi.string().valid(Tempo.FAST, Tempo.MEDIUM, Tempo.SLOW).insensitive(),
  range: Joi.number().integer().min(1),
  alternativeRange: Joi.number()
    .integer()
    .min(1)
    .when('range', {
      not: Joi.exist(),
      then: Joi.forbidden().error(
        () => new Error('"alternativeRange" is not allowed unless a "range" is also provided')
      ),
    }),
  key: Joi.string(),
});
