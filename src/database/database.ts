import { Tag } from '../models/tag';

export const sync = async (): Promise<void> => {
  await Tag.sync();
};
