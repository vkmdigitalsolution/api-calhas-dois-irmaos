module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'accessories',
            [
                {
                    id: 1,
                    name: 'vedante',
                    value: 24.0,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 2,
                    name: 'rebite',
                    value: 0.14,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 3,
                    name: 'paraf./bucha 6',
                    value: 0.3,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 4,
                    name: 'paraf./agulha',
                    value: 0.055,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 5,
                    name: 'tampinha',
                    value: 1.3,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 6,
                    name: 'estirante-mold.',
                    value: 2.0,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 7,
                    name: 'estirante-estru.',
                    value: 3.5,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 8,
                    name: 'paraf./telha-simples 2"1/4',
                    value: 0.97,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 9,
                    name: 'paraf./telha-termo(TRAP) 25mm 3"',
                    value: 1.25,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 10,
                    name: 'chumbador-parabolt',
                    value: 3,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 11,
                    name: 'paraf./costura',
                    value: 0.06,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 12,
                    name: 'caibros',
                    value: 26,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 13,
                    name: 'disco-corte 4"',
                    value: 2.6,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 14,
                    name: 'disco-corte 7"',
                    value: 7.5,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 15,
                    name: 'paraf./bucha 8',
                    value: 0.6,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 16,
                    name: 'paraf./bucha 10',
                    value: 0.85,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 17,
                    name: 'paraf./telhaTermo(TRAP) 25mm 3"1/2',
                    value: 1.35,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
                {
                    id: 18,
                    name: 'paraf./telhaTermo(TRAP) 45mm 4"',
                    value: 1.5,
                    created_at: '9999-12-31T00:00:00.000Z',
                    updated_at: '9999-12-31T00:00:00.000Z',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accessories', null, {});
    },
};
