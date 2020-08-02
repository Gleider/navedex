const Project = require('../model/project');
const { NaverProject, NaverProjects } = require('../model/naverProject');

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id } = req;
      const { name } = req.query;

      const query = name ? { where: { name } } : {};

      const projects = await Project
        .where('user_id', user_id)
        .query(query)
        .fetchAll({ require: false });

      return res.status(200).json(projects);
    } catch (error) {
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
};
