const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAll = function (Model) {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    if (!docs)
      return next(new AppError("Couldn't Find Document With that ID"), 404);

    return res.status(200).json({
      status: 'Success',
      data: {
        results: docs.length,
        data: docs,
      },
    });
  });
};

exports.getOne = function (Model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc)
      return next(new AppError("Couldn't Find Document With that ID"), 404);
    req;
    return res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });
};

exports.createOne = function (Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    return res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });
};
