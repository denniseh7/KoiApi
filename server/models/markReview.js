const { sql } = require('../db');

module.exports = {
  markHelpful: async ({ reviewId }) => sql`
    UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE id=${reviewId};
    `,
  report: async ({ reviewId }) => sql`
  UPDATE reviews
  SET reported=true
  WHERE id=${reviewId};
  `,
};
