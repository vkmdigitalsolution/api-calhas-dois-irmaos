import Sequelize, { Model } from 'sequelize';

class AccessoriesServices extends Model {
    static init(sequelize) {
        super.init(
            {
                amount: Sequelize.DECIMAL,
            },
            {
                sequelize,
                timestamps: false,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Service, {
            foreignKey: 'service_id',
            as: 'services',
        });
        this.belongsTo(models.Accessorie, {
            foreignKey: 'accessories_id',
            as: 'accessories',
        });
    }
}

export default AccessoriesServices;
