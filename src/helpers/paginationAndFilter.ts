import { isValidObjectId, Model } from 'mongoose';

export interface IPaginateData<Response> {
  data: Response[];
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

async function getPaginateAndFilteredData<Response, Filters>(
  page: number = 1,
  limit: number = 10,
  model: Model<any>,
  filters?: Filters
): Promise<IPaginateData<Response>> {
  const query: Record<string, any> = {};

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof Filters];
      if (value !== undefined && value !== null) {
        if (typeof value === 'string' && key !== 'status' && !isValidObjectId(value)) {
          query[key] = { $regex: value, $options: 'i' };
        } else {
          query[key] = value;
        }
      }
    });
  }

  const totalRecords = await model.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limit);
  const data = await model
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data,
    page,
    limit,
    totalRecords,
    totalPages
  };
}

async function getDataByFilters<Response, Filters>(model: Model<any>, filters?: Filters): Promise<Response> {
  const query: Record<string, any> = {};

  if (filters) {
    const orConditions: Record<string, any>[] = [];

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof Filters];
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          if (key === 'id') {
            query._id = value;
            return;
          }
          orConditions.push({ [key]: { $regex: value, $options: 'i' } });
        } else {
          orConditions.push({ [key]: value });
        }
      }
    });
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }
  }
  console.log('query', JSON.stringify(query));
  const response = await model.findOne(query);
  return response;
}

export { getPaginateAndFilteredData, getDataByFilters };
