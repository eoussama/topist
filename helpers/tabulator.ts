/**
 * Tabulates the index page's results
 *
 * @param {any} req The request object
 */
module.exports = function(req) {
  // Getting the tabulation type
  const type = parseInt(req.query.type || 0);
  const sanitizedType = isNaN(type) ? 0 : type < 0 ? 0 : type > 3 ? 3 : type;

  return { sanitizedType };
};
