import Sequelize, { Model } from 'sequelize';

class Service extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                width: Sequelize.DECIMAL,
                manufacturing_time: Sequelize.DECIMAL,
                instalattion_time: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Service;
