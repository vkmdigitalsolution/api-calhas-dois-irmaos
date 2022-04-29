module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accessories_services', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            service_id: {
                type: Sequelize.INTEGER,
                references: { model: 'services', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            accessories_id: {
                type: Sequelize.INTEGER,
                references: { model: 'accessories', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            amount: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('accessories_services');
    },
};
