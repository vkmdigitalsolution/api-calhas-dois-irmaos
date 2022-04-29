import BudgetsServices from '../models/BudgetsServices';

import Service from '../models/Service';
import Budget from '../models/Budget';
import Client from '../models/Client';

import AppError from '../errors/AppError';

class ReportController {
    async report(req, res) {
        const { budget_id } = req.params;

        const [budget, service] = await Promise.all([
            Budget.findOne({
                where: { id: budget_id },
                include: [
                    {
                        attributes: ['cpf', 'name', 'phone'],
                        model: Client,
                        as: 'clients',
                    },
                ],
            }),
            BudgetsServices.findAll({
                where: { budget_id },
                include: [
                    {
                        attributes: ['name'],
                        model: Service,
                        as: 'services',
                    },
                ],
            }),
        ]);

        if (!budget) {
            throw new AppError('budget not found');
        }

        return res.json({
            budget,
            service,
        });
    }
}

export default new ReportController();
