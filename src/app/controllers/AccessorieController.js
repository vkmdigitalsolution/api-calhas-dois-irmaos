import * as Yup from 'yup';

import Accessorie from '../models/Accessorie';
import Gutter from '../models/Gutter';

import AppError from '../errors/AppError';

class AccessorieController {
    async index(req, res) {
        const [accessories, gutters] = await Promise.all([
            Accessorie.findAll({ order: [['name', 'ASC']] }),
            Gutter.findAll({ order: [['name', 'ASC']] }),
        ]);

        return res.json({ accessories, gutters });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const { type } = req.body;

        const schema = Yup.object().shape({
            type: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }

        if (type === 'accessories') {
            const accessorie = await Accessorie.findByPk(id);

            if (accessorie) {
                return res.json(accessorie);
            }
        }

        if (type === 'gutters') {
            const gutter = await Gutter.findByPk(id);

            if (gutter) {
                return res.json(gutter);
            }
        }

        throw new AppError('object not found');
    }

    async update(req, res) {
        const { id } = req.params;
        const { type, value } = req.body;

        const schema = Yup.object().shape({
            type: Yup.string().required(),
            value: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }

        if (type === 'accessories') {
            const accessorie = await Accessorie.findByPk(id);

            if (accessorie) {
                await accessorie.update({ value });
                return res.json({ message: 'accessorie update' });
            }
        }

        if (type === 'gutters') {
            const gutter = await Gutter.findByPk(id);

            if (gutter) {
                await gutter.update({ value });
                return res.json({ message: 'gutter update' });
            }
        }

        throw new AppError('object not found');
    }
}

export default new AccessorieController();
