'use strict';

/**
 * mailing-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mailing-list.mailing-list');
