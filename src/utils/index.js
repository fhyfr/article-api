const mapDBToModel = ({
  id,
  author,
  title,
  body,
  created,
}) => ({
  id,
  author,
  title,
  body,
  created,
});

module.exports = { mapDBToModel };
