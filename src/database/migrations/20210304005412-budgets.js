module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('budgets', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            client_id: {
                type: Sequelize.INTEGER,
                references: { model: 'clients', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            is_approved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            total_profit: {
                type: Sequelize.DECIMAL,
            },
            total_expense: {
                type: Sequelize.DECIMAL,
            },
            total: {
                type: Sequelize.DECIMAL,
            },
            observation: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('budgets');
    },
};
