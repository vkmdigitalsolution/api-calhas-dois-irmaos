import * as Yup from 'yup';

import AccessoriesServices from '../models/AccessoriesServices';
import GuttersServices from '../models/GuttersServices';
import BudgetsServices from '../models/BudgetsServices';

import Service from '../models/Service';
import Accessorie from '../models/Accessorie';
import Gutter from '../models/Gutter';

import AppError from '../errors/AppError';

class ServiceController {
    async getServices(req, res) {
        const schema = Yup.object().shape({
            service_id: Yup.number().required(),
            gutter_id: Yup.number().required(),
            linear_metter: Yup.number().required(),
            general_expense: Yup.number().required(),
            travel_expense: Yup.number().required(),
            profit: Yup.number().required(),
            invoice: Yup.number().required(),
            address: Yup.string().required(),
        });

        let total = 0;

        const {
            service_id,
            gutter_id,
            linear_metter,
            address,
            general_expense,
            travel_expense,
            profit,
            invoice,
        } = req.body;

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }

        const convertNumberMetter = Number(linear_metter);

        const [gutter, services] = await Promise.all([
            GuttersServices.findOne({
                attributes: ['id', 'service_id', 'gutter_id', 'weight'],
                where: { service_id, gutter_id },
                include: [
                    {
                        model: Gutter,
                        as: 'gutters',
                    },
                ],
            }),
            AccessoriesServices.findAll({
                attributes: ['id', 'service_id', 'accessories_id', 'amount'],
                where: { service_id },
                include: [
                    {
                        model: Accessorie,
                        as: 'accessories',
                    },
                    {
                        model: Service,
                        as: 'services',
                        where: { id: service_id },
                    },
                ],
            }),
        ]);

        if (!gutter) {
            throw new AppError(
                'Serviço não cadastrado com o tipo calha específicada'
            );
        }

        // Calcula o total de todos os acessórios
        total = services.reduce((acc, actualValue) => {
            return (
                acc +
                convertNumberMetter *
                    Number(actualValue.amount) *
                    Number(actualValue.accessories.value)
            );
        }, 0);

        // Calcula o custo da mao de obra -> R$0,40 por minuto
        total +=
            convertNumberMetter *
                Number(services[0].services.manufacturing_time) *
                0.4 +
            convertNumberMetter *
                Number(services[0].services.instalattion_time) *
                0.4 +
            convertNumberMetter *
                Number(gutter.weight) *
                Number(gutter.gutters.value);

        if (convertNumberMetter > 7 && gutter_id < 4) {
            const vedante = await Accessorie.findByPk(1);
            // Calcula o vedante na emenda
            total +=
                (Math.ceil(convertNumberMetter / 7) - 1) *
                ((Number(services[0].services.width) / 100) * 2) *
                (Number(vedante.value) * 0.2);
        }

        const square_metter =
            gutter_id < 4
                ? convertNumberMetter * services[0].services.width
                : convertNumberMetter;

        total += Number(travel_expense) + Number(general_expense);
        total *= Number(invoice) / 100;

        const vl_profit = total * Number(profit);

        return res.json({
            key: services[0].service_id + convertNumberMetter,
            service_id: services[0].service_id,
            name: services[0].services.name,
            gutter_id,
            address,
            linear_metter: convertNumberMetter,
            square_metter,
            weigth: convertNumberMetter * gutter.weight,
            total_accessories: vl_profit,
            expense_total: total,
            profit,
            vl_profit: vl_profit - total,
            travel_expense,
            general_expense,
            invoice,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            gutter_id: Yup.number().required(),
            weight: Yup.number().required(),
            manufacturing_time: Yup.number().required(),
            instalattion_time: Yup.number().required(),
            width: Yup.number().required(),
            accessories: Yup.array().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }

        const {
            name,
            manufacturing_time,
            instalattion_time,
            width,
            accessories,
            gutter_id,
            weight,
        } = req.body;

        const service = await Service.findOne({
            where: { name: name.toUpperCase() },
        });

        if (service) {
            throw new AppError('Serviço já cadastrado');
        }

        const createService = await Service.create({
            name: name.toUpperCase(),
            manufacturing_time,
            instalattion_time,
            width,
        });

        await Promise.all(
            accessories.map(async accessorie => {
                await AccessoriesServices.create({
                    service_id: createService.id,
                    accessories_id: accessorie.id,
                    amount: accessorie.amount,
                });
            })
        );

        await GuttersServices.create({
            service_id: createService.id,
            gutter_id,
            weight,
        });

        return res.json({ message: 'Serviço cadastrado com sucesso' });
    }

    async delete(req, res) {
        const { service_id } = req.params;

        const service = await BudgetsServices.findByPk(service_id);

        if (!service) {
            throw new AppError('service not found');
        }

        await service.destroy();

        return res.json({ message: 'service deleted' });
    }
}

export default new ServiceController();
