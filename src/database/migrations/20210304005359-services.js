module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('services', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            manufacturing_time: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            instalattion_time: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            width: {
                type: Sequelize.DECIMAL,
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
        return queryInterface.dropTable('services');
    },
};
