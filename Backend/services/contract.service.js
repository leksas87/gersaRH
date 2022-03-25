const {models} = require('./../libs/sequelize');


module.exports = {
    getByEmployee,
    create,
    update,
    delete: _delete,
};

async function getByEmployee(id) {
    
        const contracts = await models.Contract.findAll({where:{userId: id}});
        
        if(contracts.length === 0){ 
            throw 'Ese usuario no tiene contratos';
        }else{
            return contracts;
        }
    
}

async function update(id, idContract, params) {
    const contract = await getContract(idContract);

    if (!contract) throw 'Contrato no encontrado'

    

    // copy params to user and save
    Object.assign(contract, params);
    await contract.save();

    return contract.get();
}

async function getContract(id) {
    const contract = await models.Contract.findByPk(id);
    if (!contract) throw 'Contrato no encontrado';
    return contract;
}

async function create(params, id) {

    const contracts = await models.Contract.findAll();

    contracts.forEach(async contract => {
        if(contract.userId === parseInt(id)){
            contract.isContractActivide = false;
            await contract.save();
        }
     });

     await models.Contract.create(params);
}

async function _delete(id) {
    const contract = await getContract(id);
    await contract.destroy();
}