'use strict';

/**
 * mailing-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = [
    createCoreController('api::mailing-list.mailing-list'),
    {
        async create(ctx) {
            let entity;
            if (ctx.is('multipart')) {
                const { data, files } = parseMultipartData(ctx);
                entity = await strapi.services.mailingList.create(data, { files });
            } else {
                entity = await strapi.services.mailingList.create(ctx.request.body);
            }

            return sanitizeEntity(entity, { model: strapi.models.mailingList })
        }
    }
];
