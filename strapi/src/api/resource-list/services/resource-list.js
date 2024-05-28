'use strict';

/**
 * resource-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::resource-list.resource-list');
