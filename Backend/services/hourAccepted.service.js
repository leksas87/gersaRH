const {models} = require('../libs/sequelize');

module.exports = {
    update
};

async function update(id, idContract, params) {
    const contract = await getContract(idContract);

    if (!contract) throw 'Contrato no encontrado'

    

    // copy params to user and save
    Object.assign(contract, params);
    await contract.save();

    return contract.get();
}

async function _delete(id) {
    const contract = await getContract(id);
    await contract.destroy();
}