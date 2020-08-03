const Project = require('../model/project');
const { NaverProject, NaverProjects } = require('../model/naverProject');

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id } = req;
      const { name } = req.query;

      const query = name ? { where: { name } } : {};

      const projects = await Project
        .where({ user_id })
        .query(query)
        .fetchAll({
          require: false,
          columns: ['id', 'name', 'created_at', 'updated_at'],
        });

      return res.status(200).json(projects);
    } catch (error) {
      return next(error.message);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id } = req;

      const project = await Project
        .where({ id, user_id })
        .fetch({
          withRelated: [{ naver: (qb) => qb.select('id', 'name', 'birthdate', 'admission_date', 'job_role') }],
          require: false,
          columns: ['id', 'name', 'created_at', 'updated_at'],
        });

      if (!project) {
        return res.status(400).json({ Error: 'Project not found' });
      }
      return res.status(200).json(project.toJSON({ omitPivot: true }));
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
      const { name, navers } = req.body;
      const { user_id } = req;

      if (!name) {
        return res.status(400)
          .json({ Error: 'Name is required' });
      }

      const project = await Project.forge().save({
        name,
        user_id,
      });

      const project_id = project.get('id');
      const naversObject = navers
        .map((nav, i) => ({ ...i, naver_id: nav, project_id }), {});

      const naverProject = await NaverProjects.forge(naversObject);
      await naverProject.invokeThen('save');

      return res.status(201).send(project);
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
      const { navers, ...body } = req.body;

      await Project.forge({ id })
        .save({ ...body }, { method: 'update', patch: true, require: false });
      if (navers) {
        const naversObject = navers
          .map((naver, i) => ({ ...i, naver_id: naver, project_id: id }));

        await NaverProject.where({ project_id: id }).destroy();

        const naverProject = await NaverProjects.forge(naversObject);
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
      await Project.where({ id }).destroy();
      return res.status(200).json('Project removed with success');
    } catch (error) {
      // console.log(error);
      if (error.message === 'No Rows Deleted') {
        return res.status(400).json({ Error: 'Project not found' });
      }
      return next(error.message);
    }
  },
};
