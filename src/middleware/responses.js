const error = (ctx, error) => {

  let obj = { success: false };

  if (err) {

    if (err instanceof Error) {
      err = { description: error.message };
    }

    obj.error = { code: error.code, description: error.description };
  }

  ctx.body = obj;
};

const success = (ctx, result) => {

  let obj = { success: true };

  if (result) {
    result.success = true;
    obj = result;
  }

  ctx.body = obj;
};


export default async (ctx, next) => {

  ctx.error   = err    => error  (ctx, err);
  ctx.success = result => success(ctx, result);

  await next();
};