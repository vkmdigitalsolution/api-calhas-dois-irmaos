module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('gutters_services', {
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
            gutter_id: {
                type: Sequelize.INTEGER,
                references: { model: 'gutters', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            weight: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('gutters_services');
    },
};
