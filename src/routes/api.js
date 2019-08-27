import Router       from 'koa-router';
import * as fravega from '../controllers/api/fravega.com';

const router = new Router({
  prefix: '/api'
});

router.get('/fravega/categories', fravega.getCategories);
router.get('/fravega/sections/:eid', fravega.getSections);

export default router;