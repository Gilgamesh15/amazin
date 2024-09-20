import { Prisma } from "@prisma/client";
import { getTopPriorityCategories } from "../actions";

export type GetTopPriorityCategoriesReturnType = Prisma.PromiseReturnType<
  typeof getTopPriorityCategories
>;
