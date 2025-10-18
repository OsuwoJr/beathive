// Standardized API response helpers

exports.success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  });
};

exports.error = (res, code, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message
    },
    timestamp: new Date().toISOString()
  });
};

exports.validationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input data',
      details: errors
    },
    timestamp: new Date().toISOString()
  });
};

exports.notFound = (res, resource = 'Resource') => {
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `${resource} not found`
    },
    timestamp: new Date().toISOString()
  });
};

exports.unauthorized = (res, message = 'Authentication required') => {
  return res.status(401).json({
    success: false,
    error: {
      code: 'UNAUTHORIZED',
      message
    },
    timestamp: new Date().toISOString()
  });
};

exports.forbidden = (res, message = 'Access denied') => {
  return res.status(403).json({
    success: false,
    error: {
      code: 'FORBIDDEN',
      message
    },
    timestamp: new Date().toISOString()
  });
};

