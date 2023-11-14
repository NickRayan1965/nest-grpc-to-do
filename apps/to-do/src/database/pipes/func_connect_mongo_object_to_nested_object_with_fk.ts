import { PipelineStage, Types } from 'mongoose';
interface LookupOptions {
  /**
   * @from - The name of the collection in the same database to perform the join with.
   */
  from: string;
  localField: string;
  foreignField: string;
  as: string;
  many?: boolean;
  matchIds?: string[];
}

export default function pipelineStageToConnectToNestedObject({
  from,
  localField,
  foreignField = '_id',
  as = localField,
  many = false,
  matchIds = [],
}: LookupOptions) {
  const pipeLineStages: PipelineStage[] = [
    {
      $lookup: {
        from,
        localField,
        foreignField,
        as,
      },
    },
  ];
  if (!many) {
    pipeLineStages.push({
      $unwind: {
        path: `$${as}`,
        preserveNullAndEmptyArrays: true,
      },
    });
  }
  let matchPipeline: PipelineStage;
  if (matchIds.length) {
    matchPipeline = {
      $match: {
        [`${as}.${foreignField}`]: {
          $in: matchIds.map((id) => new Types.ObjectId(id)),
        },
      },
    };
  }
  return { pipeLineStagesOfRelation: pipeLineStages, matchPipeline };
}
