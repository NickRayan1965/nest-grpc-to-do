import { PipelineStage } from 'mongoose';
import { StringColumns } from '../../common/types/string-columns';

export interface IPipeLinesStageToFilterNamesComplexly<T> {
  expression: string;
  fieldsToConcat: StringColumns<T>[];
}
export default function pipeLinesStageToFilterNamesComplexly<T>({
  expression,
  fieldsToConcat,
}: IPipeLinesStageToFilterNamesComplexly<T>) {
  expression = cleanFilterExpression(expression ?? '');
  if (!expression) return [] as PipelineStage[];
  const namesList = expression.split(' ');

  //["campoPrimerNombre", "campoSegundoNombre", "campoPrimerApellido"] => [{$toLower: "$campoPrimerNombre"}, " " ,{$toLower: "$campoSegundoNombre"}, " " ...]
  const fullNameConcatList = createConcatFields(fieldsToConcat as string[]);

  const fullNameArrayName = 'fullNameArray';
  const fullNameName = 'fullName';

  const is_in_the_list_of_names_conditions = createIsInListConditions(
    namesList,
    fullNameArrayName,
  );
  namesList.push(expression);
  const is_in_the_full_name_comodin_filter = createIsInFullNameComodinFilter(
    namesList,
    fullNameName,
  );
  return [
    {
      $addFields: {
        [fullNameName]: { $concat: fullNameConcatList },
      },
    },
    {
      $addFields: {
        [fullNameArrayName]: {
          $split: [`$${fullNameName}`, ' '],
        },
      },
    },
    {
      $addFields: {
        coincidences: {
          $add: [
            ...is_in_the_list_of_names_conditions,
            ...is_in_the_full_name_comodin_filter,
          ],
        },
      },
    },
    {
      $match: {
        coincidences: { $gt: 0 },
      },
    },
    {
      $sort: { coincidences: -1 },
    },
    {
      $project: {
        coincidences: false,
        [fullNameName]: false,
        [fullNameArrayName]: false,
      },
    },
  ] as PipelineStage[];
}
function cleanFilterExpression(expression: string) {
  return expression.toLowerCase().trim().replace(/ +/g, ' ');
}
function createConcatFields(fieldsToConcat: string[]) {
  return fieldsToConcat
    .join('/ /')
    .split('/')
    .map((field) => {
      return field == ' ' ? field : { $toLower: `$${field}` };
    });
}
function createIsInListConditions(
  namesList: string[],
  fullNameArrayName: string,
) {
  return namesList.map((name: string) => {
    return {
      $cond: {
        if: {
          $in: [name, `$${fullNameArrayName}`],
        },
        then: 1,
        else: 0,
      },
    };
  });
}
export function createIsInFullNameComodinFilter(
  namesList: string[],
  fullName: string,
) {
  return namesList.map((name) => {
    return {
      $cond: {
        if: { $ne: [{ $indexOfBytes: [fullName, name] }, -1] },
        then: 1,
        else: 0,
      },
    };
  });
}
