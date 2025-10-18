const { body, param, query, validationResult } = require('express-validator');

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: errors.array()
      }
    });
  };
};

// Common validation rules
exports.userIdValidation = [
  param('id').isUUID().withMessage('Invalid user ID format')
];

exports.trackIdValidation = [
  param('id').isUUID().withMessage('Invalid track ID format')
];

exports.uploadTrackValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('genre').trim().notEmpty().withMessage('Genre is required'),
  body('description').optional().trim(),
  body('tags').optional().isArray()
];

exports.updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('bio').optional().trim().isLength({ max: 1000 }),
  body('location').optional().trim().isLength({ max: 100 }),
  body('genre').optional().trim().isLength({ max: 50 })
];

exports.searchValidation = [
  query('q').optional().trim(),
  query('genre').optional().trim(),
  query('location').optional().trim(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
];

