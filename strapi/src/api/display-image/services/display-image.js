'use strict';

/**
 * display-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::display-image.display-image');
