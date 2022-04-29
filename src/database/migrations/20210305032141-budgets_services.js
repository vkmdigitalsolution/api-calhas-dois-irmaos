module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('budgets_services', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            budget_id: {
                type: Sequelize.INTEGER,
                references: { model: 'budgets', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            service_id: {
                type: Sequelize.INTEGER,
                references: { model: 'services', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            gutter_id: {
                type: Sequelize.INTEGER,
                references: { model: 'gutters', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            linear_metter: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            square_metter: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            travel_expense: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            general_expense: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            profit: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            invoice: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            vl_profit: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            expense_total: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            weigth: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            total_accessories: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('budgets_services');
    },
};
