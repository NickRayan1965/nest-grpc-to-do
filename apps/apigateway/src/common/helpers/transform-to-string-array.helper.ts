import { Transform } from 'class-transformer';
import isValidJson from '../utils/is-valid-json.util';

export const TransformToStringArray = () =>
  Transform(({ value }) => {
    if (!isValidJson(value)) return value;
    return JSON.parse(value);
  });
