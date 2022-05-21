import * as Yup from 'yup';
import { IDBProviderModels } from '../../../../dist';

export type ModelNames = 'Articles';
export const models: IDBProviderModels<ModelNames> = {
  Articles: {
    name: 'article',
    keyPath: 'id',
    autoIncrement: true,
    indexes: [['date', 'date']],
    schema: {
      id: Yup.string(),
      title: Yup.string(),
      date: Yup.date(),
      article: Yup.string(),
    },
  },
};
