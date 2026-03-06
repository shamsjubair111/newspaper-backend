const slugify = require('slugify');

module.exports = function(str){
  if(!str) return '';
  return slugify(str, { lower: true, strict: true });
}
