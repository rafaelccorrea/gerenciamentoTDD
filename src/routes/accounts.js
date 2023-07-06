module.exports = (app) => {
  const create = async (req, res) => {
    const result = await app.services.account.save(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
  };

  const getAll = async (req, res) => {
    try {
      const result = await app.services.account.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const findById = async (req, res) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const update = async (req, res) => {
    const result = await app.services.account.update(req.params.id, req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(200).json(result[0]);
  };

  const remove = async (req, res) => {
    const result = await app.services.account.remove(req.params.id);
    if (result.error) return res.status(400).json(result);
    return res.status(204).send();
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
  };
};
