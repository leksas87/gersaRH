const {models} = require('./../libs/sequelize');


module.exports = {

    create,
    update
};

async function update(id, params) {
    const contract = await getContract(id);

    

    // copy params to user and save
    Object.assign(contract, params);
    await contract.save();

    return contract.get();
}

async function getContract(id) {
    const contract = await models.Contract.findByPk(id);
    if (!contract) throw 'Usuario no encontrado';
    return contract;
}

async function create(params) {

    const contracts = await models.Contract.findAll();

    contracts.forEach(async contract => {
        if(contract.userId === params.userId){
            contract.isContractActivide = false;
            await contract.save();
        }
        console.log(contract.isContractActivide);
     });

     await models.Contract.create(params);
}