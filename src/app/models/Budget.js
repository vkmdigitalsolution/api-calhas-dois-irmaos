import Sequelize, { Model } from 'sequelize';

class Budget extends Model {
    static init(sequelize) {
        super.init(
            {
                is_approved: Sequelize.BOOLEAN,
                observation: Sequelize.STRING,
                total: Sequelize.DECIMAL,
                total_expense: Sequelize.DECIMAL,
                total_profit: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users',
        });
        this.belongsTo(models.Client, {
            foreignKey: 'client_id',
            as: 'clients',
        });
    }
}

export default Budget;
