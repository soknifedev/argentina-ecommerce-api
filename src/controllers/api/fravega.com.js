import assert       from 'http-assert';
import * as encoder from '../../utils/encoder';
import cheerio      from 'cheerio';
import request      from '../../utils/krequests';


export const getCategories = async ctx => {

  await request.promise({
    method: 'GET',
    url: 'https://www.fravega.com/',
    headers: {
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0"
    }
  }).then(async (response) => {
    let $ = cheerio.load(response.body);
    let categoryElemets = $("a[href*=categorias]");
    let categories = [];

    categoryElemets.each(function(i, elem) {
      let name =  $(this).text();
      let href =  $(this).attr("href");
      categories.push({
        title: name,
        eid: `/api/fravega/sections/${encoder.encode(href)}`,
      })
    });

  
    ctx.success({
      categories: {
        total: categories.length,
        items: categories
      }
    });
  }).catch(err => { 
    assert(false, 400, err.message) 
  });

};


export const getSections = async ctx => {

  await request.promise({
    method: 'GET',
    url: encoder.decode(ctx.params.eid),
    headers: {
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0"
    }
  }).then(async (response) => {
    let $ = cheerio.load(response.body);
    let categoryBoxes = $("div[class=cajas]");

    let sections = [];

    categoryBoxes.each(function(i, elem) {
      let title =  $(this).find("h3").first().text();
      let thumb =  $(this).find("img").first().attr("src");
      let subCategories =  $(this).find('ul a[href*=l]');
      
      let section = {
        title: title,
        thumb: thumb,
        total: 0,
        items: []
      }
      subCategories.each(function(i,elem) {
        let href = $(this).attr("href");
        section.items.push({
          name: $(this).text(),
          eid: `/api/fravega/products/${encoder.encode(href)}`,
        })
      });
      section.total = section.items.length
      sections.push(section);

    });

  
    ctx.success({
      sections: {
        total: sections.length,
        items: sections
      }
    });
  }).catch(err => { 
    assert(false, 400, err.message) 
  });

};

/*
// Example
export const test = async ctx => {

};
*/