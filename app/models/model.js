module.exports = function(Model) {
  const Self = {
    Model: Model,
    formatSuccess: async function(doc) {
      if(!doc.error)
        return { success: true, response: doc };
      return doc;
    },
    find: async function(query) {
      const doc = await Model.find(query).catch(function(e) {
        return { error: e };
      });
      return await Self.formatSuccess(doc);
    },
    save: async function(data) {
      const msg = new Model(data);
      const doc = await msg.save().catch(function(e) {
        return { error: e };
      });
      return await Self.formatSuccess(doc);
    }
  };
  return Self;
};
