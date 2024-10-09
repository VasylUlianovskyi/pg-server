const yup = require('yup');

module.exports.CREATE_USER_VALIDATION_SCHEMA = yup.object({
  firtsName: yup
    .string()
    .min(2)
    .max(50)
    .matches(/^[A-Z][a-z]{1,49}$/, 'Name must starts with capital letter')
    .required(),
  lastName: yup
    .string()
    .min(2)
    .max(50)
    .matches(/^[A-Z][a-z]{1,49}$/, 'Name must starts with capital letter')
    .required(),
  email: yup.string().email(),
  tel: yup
    .string()
    .matches(/^\+380\d{9}$/)
    .required(),
});

module.exports.PAGE_VALIDATION_SCHEMA = yup.number().min(1).integer();
module.exports.RESULTS_VALIDATION_SCHEMA = yup
  .number()
  .min(5)
  .max(50)
  .integer();

module.exports.CREATE_PHONE_VALIDATION_SCHEMA = yup.object({
  brand: yup
    .string()
    .required('Brand is required')
    .max(50, 'Brand can be at most 50 characters'),
  model: yup
    .string()
    .required('Model is required')
    .max(50, 'Model can be at most 50 characters'),
  os: yup
    .string()
    .required('OS is required')
    .max(20, 'OS can be at most 20 characters'),
  screen_size: yup
    .number()
    .required('Screen size is required')
    .min(3, 'Screen size must be at least 3 inches')
    .max(10, 'Screen size must be at most 10 inches'),
  ram: yup
    .number()
    .required('RAM is required')
    .min(1, 'RAM must be at least 1 GB')
    .max(64, 'RAM must be at most 64 GB'),
  storage_capacity: yup
    .number()
    .required('Storage capacity is required')
    .min(16, 'Storage capacity must be at least 16 GB')
    .max(1024, 'Storage capacity must be at most 1024 GB'),
  battery_capacity: yup
    .number()
    .required('Battery capacity is required')
    .min(1000, 'Battery capacity must be at least 1000 mAh')
    .max(10000, 'Battery capacity must be at most 10000 mAh'),
  camera_megapixels: yup
    .number()
    .required('Camera megapixels is required')
    .min(2, 'Camera megapixels must be at least 2')
    .max(108, 'Camera megapixels must be at most 108'),
  price: yup
    .number()
    .required('Price is required')
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price must be at most 10000'),
  release_date: yup
    .date()
    .required('Release date is required')
    .max(new Date(), 'Release date cannot be in the future'),
  color: yup
    .string()
    .required('Color is required')
    .max(20, 'Color can be at most 20 characters'),
  is_dual_sim: yup.boolean().required('is_dual_sim is required'),
});

module.exports.PHONE_UPDATE_SCHEMAS = yup.object({
  brand: yup
    .string()
    .min(1, 'Brand must be at least 1 character long')
    .max(50, 'Brand must be at most 50 characters long'),
  model: yup
    .string()
    .min(1, 'Model must be at least 1 character long')
    .max(50, 'Model must be at most 50 characters long'),
});
