import Accessorie from '../models/Accessorie';
import Service from '../models/Service';
import Gutter from '../models/Gutter';

class TypesController {
    async indexServices(req, res) {
        const services = await Service.findAll({ order: [['name', 'ASC']] });

        return res.json(services);
    }

    async indexGutters(req, res) {
        const gutters = await Gutter.findAll({ order: [['name', 'ASC']] });

        return res.json(gutters);
    }

    async accessories(req, res) {
        const accessories = await Accessorie.findAll({
            order: [['name', 'ASC']],
        });

        return res.json(accessories);
    }
}

export default new TypesController();
