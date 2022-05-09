const {models} = require('../libs/sequelize');

module.exports = {
    update,
    delete:_delete
};
async function getHoursAccepted(id) {
    const hoursAccepted = await models.hoursAccepted.findByPk(id);
    if (!hoursAccepted) throw 'Registro no encontrado';
    return hoursAccepted;
}
async function update( idHours, params) {
    const hoursAccepted = await getHoursAccepted(idHours);

    // if (!hourAccepted) throw 'Registro no encontrado'

    // copy params to user and save
    Object.assign(hoursAccepted, params);
    await hoursAccepted.save();

    return hoursAccepted.get();
}

async function _delete(id) {
    const hoursAccepted = await getHoursAccepted(id);
    await hoursAccepted.destroy();
}