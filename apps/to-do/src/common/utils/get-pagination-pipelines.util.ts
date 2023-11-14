import { PipelineStage } from 'mongoose';

export interface IGetPaginationPipelinesOptions {
  page: number;
  pageSize: number;
  minPage: number;
}
export const getPaginationPipelines = ({
  page,
  pageSize,
  minPage,
}: IGetPaginationPipelinesOptions) => {
  return [
    {
      $skip: (page - minPage) * pageSize,
    },
    {
      $limit: pageSize,
    },
  ] as PipelineStage[];
};
