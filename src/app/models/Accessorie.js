import Sequelize, { Model } from 'sequelize';

class Accessorie extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                value: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Accessorie;
