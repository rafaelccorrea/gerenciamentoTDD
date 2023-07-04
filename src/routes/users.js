module.exports = () => {
  const findAll = (req, res) => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
      },
    ];
    res.status(200).json(users);
  };

  const create = (req, res) => {
    res.status(201).json(req.body);
  };

  return {
    findAll,
    create,
  };
};
