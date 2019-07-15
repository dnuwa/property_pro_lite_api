/* eslint-disable consistent-return */
export function validateEmptyFields(req, res, next) {
  const {
    status, type, state, city, address, price, imageUrl, description,
  } = req.body;
  if (!status || !type || !state || !city || !address || !price || !imageUrl || !description) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'status, decription, type, state, city, address, price and imageUrl are required !',
    });
  }
  next();
}

export function validatePrice(req, res, next) {
  const { price } = req.body;

  if (isNaN(price)) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Please enter a valid property price',
    });
  }
  next();
}
