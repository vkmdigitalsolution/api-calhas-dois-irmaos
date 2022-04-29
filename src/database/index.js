import Sequelize from 'sequelize';

import AccessoriesServices from '../app/models/AccessoriesServices';
import GuttersServices from '../app/models/GuttersServices';

import User from '../app/models/User';
import Budget from '../app/models/Budget';
import Service from '../app/models/Service';
import Accessorie from '../app/models/Accessorie';
import Client from '../app/models/Client';
import Gutter from '../app/models/Gutter';
import BudgetsServices from '../app/models/BudgetsServices';

import databaseConfig from '../config/database';

const models = [
    User,
    Budget,
    Service,
    Accessorie,
    Client,
    Gutter,
    AccessoriesServices,
    GuttersServices,
    BudgetsServices,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
