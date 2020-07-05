module.exports = function(Model) {
  const Self = {
    Model: Model,
    find: async function(query) {
      const doc = await Model.find(query).catch(function(e) {
        return { error: e };
      });
      return doc;
    },
    save: async function(data) {
      const msg = new Model(data);
      const doc = await msg.save().catch(function(e) {
        return { error: e };
      });
      return doc;
    }
  };
  return Self;
};
