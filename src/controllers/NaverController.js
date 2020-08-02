const Naver = require('../model/naver');

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id } = req;
      const { job_role, name, admission_time = 0 } = req.query;

      const dt = new Date();
      if (admission_time) {
        dt.setFullYear(dt.getFullYear() - admission_time);
      }
      let query = {};
      query = job_role ? { where: { job_role } } : {};
      query = name ? { ...query, andWhere: { name } } : { ...query };

      const navers = await Naver
        .where('user_id', user_id)
        .query(query)
        .query('where', 'admission_date', '<=', dt)
        .fetchAll({ require: false });

      return res.status(200).json(navers);
    } catch (error) {
      return next(error.message);
    }
  },

  async store(req, res, next) {
    try {
      const {
        name, birthdate, admission_date, job_role,
      } = req.body;
      const { user_id } = req;

      if (!name || !birthdate || !admission_date || !job_role) {
        return res.status(400)
          .json({ Error: 'Name, birthdate, admission date and job role are required' });
      }

      const user = await Naver.forge().save({
        user_id,
        name,
        birthdate,
        admission_date,
        job_role,
      });

      return res.status(201).send(user);
    } catch (error) {
      return next(error.message);
    }
  },
};
