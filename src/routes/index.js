import Router    from 'koa-router';
import api       from './api';
import responses from '../middleware/responses';

const router = new Router();

router.use(responses);

router.use(async (ctx, next) => {

  try {
    await next();
  }
  catch (e) {
    console.error(e);
    ctx.error(e);
  }
  
});

router.use(api.routes());

export default router;