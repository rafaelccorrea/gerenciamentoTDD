module.exports = (app) => {
  const create = async (req, res, next) => {
    try {
      const result = await app.services.account.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const result = await app.services.account.findAll();
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const findById = async (req, res, next) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const update = async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      return res.status(200).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  const remove = async (req, res, next) => {
    try {
      await app.services.account.remove(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
  };
};
