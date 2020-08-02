const Naver = require('../model/naver');

module.exports = {
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
