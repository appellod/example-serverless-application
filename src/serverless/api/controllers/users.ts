import { User, UserPermissions } from "../../../common/postgres";
import { HttpContext, IFunctionRequest } from "../../../common/serverless";
import { RestController } from "./rest";

const restController = new RestController(User, new UserPermissions());

export async function count(ctx: HttpContext, req: IFunctionRequest) {
  const result = await restController.count(req.query, req.user);

  ctx.res.body = { count: result };
}

export async function create(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.create(req.body, {}, req.user);
  ctx.res.body = { record };
}

export async function find(ctx: HttpContext, req: IFunctionRequest) {
  const records = await restController.find(req.query, req.user);
  ctx.res.body = { records };
}

export async function findFriends(ctx: HttpContext, req: IFunctionRequest) {
  const records = await restController.relatedQuery(req.params.id, "friends", req.query, req.user);
  ctx.res.body = { records };
}

export async function findIgnoredUsers(ctx: HttpContext, req: IFunctionRequest) {
  const records = await restController.relatedQuery(req.params.id, "ignored_users", req.query, req.user);
  ctx.res.body = { records };
}

export async function findOne(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.findOne(req.params.id, req.user);
  ctx.res.body = { record };
}

export async function relateFriends(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.relate(req.params.id, "friends", req.body.ids, req.user);
  ctx.res.body = { record };
}

export async function relateIgnoredUsers(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.relate(req.params.id, "ignored_users", req.body.ids, req.user);
  ctx.res.body = { record };
}

export async function remove(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.remove(req.params.id, req.user);
  ctx.res.body = { record };
}

export async function unrelateFriends(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.unrelate(req.params.id, "friends", req.body.ids, req.user);
  ctx.res.body = { record };
}

export async function unrelateIgnoredUsers(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.unrelate(req.params.id, "ignored_users", req.body.ids, req.user);
  ctx.res.body = { record };
}

export async function update(ctx: HttpContext, req: IFunctionRequest) {
  const record = await restController.update(req.params.id, req.body, {}, req.user);
  ctx.res.body = { record };
}
