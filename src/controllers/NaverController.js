const Naver = require('../model/naver');
const { NaverProject, NaverProjects } = require('../model/naverProject');

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
        .fetchAll({
          require: false,
          columns: ['id', 'name', 'birthdate', 'admission_date', 'job_role', 'created_at', 'updated_at'],
        });

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
        .fetch({
          require: false,
          withRelated: [{ project: (qb) => qb.select('id', 'name') }],
          columns: ['id', 'name', 'birthdate', 'admission_date', 'job_role', 'created_at', 'updated_at'],
        });

      if (!naver) {
        return res.status(400).json({ Error: 'User not found' });
      }
      return res.status(200).json(naver.toJSON({ omitPivot: true }));
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
        name, birthdate, admission_date, job_role, projects,
      } = req.body;
      const { user_id } = req;

      if (!name || !birthdate || !admission_date || !job_role) {
        return res.status(400)
          .json({ Error: 'Name, birthdate, admission date and job role are required' });
      }

      const naver = await Naver.forge().save({
        user_id,
        name,
        birthdate,
        admission_date,
        job_role,
      });
      const naver_id = naver.get('id');
      const projectsObject = projects
        .map((project, i) => ({ ...i, project_id: project, naver_id }));

      const naverProject = await NaverProjects.forge(projectsObject);
      await naverProject.invokeThen('save');

      return res.status(201).send(naver);
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
      const { projects, ...body } = req.body;

      await Naver.forge({ id })
        .save({ ...body }, { method: 'update', patch: true, require: false });
      if (projects) {
        const projectsObject = projects
          .map((project, i) => ({ ...i, project_id: project, naver_id: id }));

        await NaverProject.where({ naver_id: id }).destroy();

        const naverProject = await NaverProjects.forge(projectsObject);
        await naverProject.invokeThen('save');
      }
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
