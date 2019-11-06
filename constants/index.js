exports.BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://warm-island-43015.herokuapp.com'
    : 'localhost:3000'

exports.PORT = process.env.PORT || 3000
