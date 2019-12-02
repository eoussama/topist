/**
 * Tabulates the index page's results
 *
 * @param {any} req The request object
 */
module.exports = function(req) {
  // Getting the tabulation type
  const rawType = parseInt(req.query.type || 0);
  const type = isNaN(rawType) ? 0 : rawType < 0 ? 0 : rawType > 3 ? 3 : rawType;
  const opts = {
    date: type === 3 ? -1 : type === 2 ? 1 : null,
    views: type === 1 ? -1 : null,
    upvotes: type === 0 ? -1 : null
  };

  Object.keys(opts)
    .filter(key => !opts[key])
    .forEach(key => {
      delete opts[key];
    });

  return { opts, type };
};
