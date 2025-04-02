// Example: Format API responses consistently
const formatResponse = (data, error = null) => ({
    success: !error,
    data: error ? null : data,
    error: error || null,
  });
  
  module.exports = { formatResponse };