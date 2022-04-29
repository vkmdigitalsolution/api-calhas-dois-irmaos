module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'gutters',
            [
                {
                    id: 1,
                    name: 'GALVALUME 26',
                    value: 16.5,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 2,
                    name: 'CHAPA BRANCA 26',
                    value: 25,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 3,
                    name: 'GALVALUME 24',
                    value: 18.7,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 4,
                    name: 'TELHA TERMO ACUSTICA 0.43',
                    value: 72.36,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 5,
                    name: 'TELHA SIMPLES 0.43',
                    value: 124.76,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 6,
                    name: 'TELHA SIMPLES 0.5',
                    value: 72.36,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('gutters', null, {});
    },
};
