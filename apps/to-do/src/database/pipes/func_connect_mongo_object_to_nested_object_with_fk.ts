import { PipelineStage, Types } from 'mongoose';
interface LookupOptions {
  from: string;
  localField: string;
  foreignField: string;
  as: string;
  matchIds?: string[];
}
export default function pipelineStageToConnectToNestedObject({
  from,
  localField,
  foreignField = '_id',
  as = localField,
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
    {
      $unwind: `$${as}`,
    },
  ];
  let matchPipeline: PipelineStage.Match;
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
