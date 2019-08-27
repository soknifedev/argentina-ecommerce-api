import Koa        from 'koa';
import bodyParser from 'koa-bodyparser';
import json       from 'koa-json';
import compress   from 'koa-compress';
import router     from './routes';

const app = new Koa();

app.proxy = true;

app.use(bodyParser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error: ' + err.message);
  }
}));

app.use(json({
  pretty: true
}));

app.use(compress());
app.use(router.routes());

export default app;