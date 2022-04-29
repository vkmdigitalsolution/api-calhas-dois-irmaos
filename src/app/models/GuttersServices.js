import Sequelize, { Model } from 'sequelize';

class GuttersServices extends Model {
    static init(sequelize) {
        super.init(
            {
                weight: Sequelize.DECIMAL,
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
        this.belongsTo(models.Gutter, {
            foreignKey: 'gutter_id',
            as: 'gutters',
        });
    }
}

export default GuttersServices;
