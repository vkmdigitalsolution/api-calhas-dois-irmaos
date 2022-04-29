import Sequelize, { Model } from 'sequelize';

class Gutter extends Model {
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

export default Gutter;
