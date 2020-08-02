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

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id } = req;

      const naver = await Naver
        .where({ id, user_id })
        .fetch({ require: false });

      if (!naver) {
        return res.status(400).json({ Error: 'User not found' });
      }
      return res.status(200).json(naver);
    } catch (error) {
      // code of exception when put a wrong UUID
      if (error.code === '22P02') {
        return res.status(400).json({ Error: 'Pattern id is wrong' });
      }
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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (req.body.id) {
        return res.status(400).json({ Error: 'Is not allowed edit id' });
      }
      await Naver.where({ id })
        .save({ name: 'aaa' }, {
          method: 'update', patch: true, require: false,
        });

      // console.log(updated);
      return res.status(200).json('Updated with success');
    } catch (error) {
      return next(error.message);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Naver.where({ id }).destroy();
      return res.status(200).json('Naver removed with success');
    } catch (error) {
      // console.log(error);
      if (error.message === 'No Rows Deleted') {
        return res.status(400).json({ Error: 'Naver not found' });
      }
      return next(error.message);
    }
  },
};
