module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: '',
        description: '',
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: '/',
            description: '',
        },
    ],
    tags: [
        {
            name: 'Users',
            description: 'Verb for Users in the system',
        },
        {
            name: 'Sessions',
            description: 'Verb for Sessions in the system',
        },
        {
            name: 'Services',
            description: 'Verb for Services in the system',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/users': {
            post: {
                tags: ['Users'],
                summary: 'Create a new user in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/User',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            put: {
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                tags: ['Users'],
                summary: 'Update user in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/UserUpdate',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Not Authorized.',
                    },
                },
            },
        },
        '/sessions': {
            post: {
                tags: ['Sessions'],
                summary: 'Create a new session in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                    },
                                    password: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/services': {
            post: {
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Services',
                        type: 'string',
                    },
                ],
                tags: ['Services'],
                summary: 'get service in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Service',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Not Authorized.',
                    },
                },
            },
        },
    },
    definitions: {
        User: {
            type: 'object',
            properties: {
                user: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        UserUpdate: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                oldPassword: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        Service: {
            type: 'object',
            properties: {
                service_id: {
                    type: 'number',
                },
                gutter_id: {
                    type: 'number',
                },
                linear_metter: {
                    type: 'number',
                },
                address: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                general_expense: {
                    type: 'number',
                },
                travel_expense: {
                    type: 'number',
                },
                profit: {
                    type: 'number',
                },
                invoice: {
                    type: 'number',
                },
            },
        },
    },
};
