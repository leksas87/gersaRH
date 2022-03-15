const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

module.exports = {
    create,
    getEventsById,
    getEventsByIdDelete,
    getEvents
};

async function getEvents() {

    return await models.EventType.findAll();
}

async function getEventsById(id) {

        const event = await models.EventType.findOne({ where: { id } });
        
        if ( !event)  throw 'Tipo de evento no encontrado';

        return event;
}



async function create(params) {
    await models.EventType.create(params);
}

async function getEventsByIdDelete(id) {

    const event = await getEventsById(id);

    if ( !event)  throw 'Tipo de evento no encontrado';

    await event.destroy();
}
