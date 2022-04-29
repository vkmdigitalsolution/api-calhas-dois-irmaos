import Sequelize, { Model } from 'sequelize';

class BudgetsServices extends Model {
    static init(sequelize) {
        super.init(
            {
                address: Sequelize.STRING,
                linear_metter: Sequelize.DECIMAL,
                square_metter: Sequelize.DECIMAL,
                weigth: Sequelize.DECIMAL,
                total_accessories: Sequelize.DECIMAL,
                travel_expense: Sequelize.DECIMAL,
                general_expense: Sequelize.DECIMAL,
                profit: Sequelize.DECIMAL,
                vl_profit: Sequelize.DECIMAL,
                expense_total: Sequelize.DECIMAL,
                invoice: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Service, {
            foreignKey: 'service_id',
            as: 'services',
        });
        this.belongsTo(models.Budget, {
            foreignKey: 'budget_id',
            as: 'budgets',
        });
        this.belongsTo(models.Gutter, {
            foreignKey: 'gutter_id',
            as: 'gutters',
        });
    }
}

export default BudgetsServices;
