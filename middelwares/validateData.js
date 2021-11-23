const validateId = (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) res.status(400).json({ error: "El parámetro no es válido" });
  else {
    req.params.id = parseInt(id);
    next();
  }
};

const validatePostBody = (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  if (
    !(typeof title == "string" && /\w+/.test(title)) ||
    !(
      (typeof price == "string" || typeof price == "number") &&
      /^\d+(\.\d+)?$/.test(price)
    ) ||
    !(
      typeof thumbnail == "string" &&
      /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
    )
  )
    res.status(400).json({ error: "Los valores enviados no son válidos" });
  else {
    title = title.trim();
    price = Math.round(parseFloat(price) * 100) / 100;
    thumbnail = thumbnail.trim();
    req.body = { ...req.body, title, price, thumbnail };
    next();
  }
};

const validatePutBody = (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  if (
    (title !== undefined && !(typeof title == "string" && /\w+/.test(title))) ||
    (price !== undefined &&
      !(
        (typeof price == "string" || typeof price == "number") &&
        /^\d+(\.\d+)?$/.test(price)
      )) ||
    (thumbnail !== undefined &&
      !(
        typeof thumbnail == "string" &&
        /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
      ))
  )
    res.status(400).json({ error: "Los valores enviados no son válidos" });
  else if (title === undefined && price === undefined && thumbnail == undefined)
    res.status(400).json({ error: "No hay campos válidos para actualizar" });
  else {
    title = title?.trim();
    price = price && Math.round(parseFloat(price) * 100) / 100;
    thumbnail = thumbnail?.trim();
    req.body = { ...req.body, title, price, thumbnail };
    next();
  }
};
module.exports = { validateId, validatePostBody, validatePutBody };
