const { Model, DataTypes, Sequelize } = require('sequelize');

const { ROLLTYPE_TABLE } = require('./rollType.model');

const USER_TABLE = 'Users';

const UserSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: { type: DataTypes.STRING, allowNull: false },
	username: { type: DataTypes.STRING, allowNull: false },
	phone: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
	active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
	hash: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
	rollTypeId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: { model: ROLLTYPE_TABLE, key: 'id' },
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	confirmationCode: { type: DataTypes.STRING, unique: true },
	isEmployeeActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
};

class User extends Model {
	static associate(models) {
		// associate
		this.hasOne(models.Employee, { foreignKey: 'userId' });
		this.belongsTo(models.RollType, { as: 'rollType' });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timestamps: false,
		};
	}
}

module.exports = { USER_TABLE, UserSchema, User };
