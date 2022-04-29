import * as Yup from 'yup';

import BudgetsServices from '../models/BudgetsServices';

import Budget from '../models/Budget';
import Client from '../models/Client';
import Service from '../models/Service';

import AppError from '../errors/AppError';

class BudgetController {
    async listOneBudget(req, res) {
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

    async index(req, res) {
        const count = await Budget.count();
        const budgets = await BudgetsServices.findAll({
            attributes: ['budget_id', 'updated_at'],
            include: [
                {
                    attributes: ['name'],
                    model: Service,
                    as: 'services',
                },
                {
                    attributes: ['total'],
                    model: Budget,
                    as: 'budgets',
                    include: [
                        {
                            attributes: ['name'],
                            model: Client,
                            as: 'clients',
                        },
                    ],
                },
            ],
            order: [['updated_at', 'DESC']],
            offset: Number(req.query.offset) * 20,
            limit: 20,
        });

        const pages = Math.ceil(count / 20);

        return res.json({ budgets, count: pages === 0 ? 1 : pages });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            user_id: Yup.number().required(),
            services: Yup.array()
                .of(
                    Yup.object().shape({
                        service_id: Yup.number().required(),
                        gutter_id: Yup.number().required(),
                        address: Yup.string().required(),
                        linear_metter: Yup.number().required(),
                        square_metter: Yup.number().required(),
                        weigth: Yup.number().required(),
                        total_accessories: Yup.number().required(),
                        vl_profit: Yup.number().required(),
                        expense_total: Yup.number().required(),
                        travel_expense: Yup.number().required(),
                        general_expense: Yup.number().required(),
                        profit: Yup.number().required(),
                        invoice: Yup.number().required(),
                    })
                )
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }
        /** SOMENTE ESSES VALORES PROFIT:
         * -> 1.6
         * -> 1.7
         * -> 2.0
         */

        const { name, cpf, phone, user_id, observation, services } = req.body;

        let client = await Client.findOne({ where: { name } });

        if (!client) {
            client = await Client.create({
                name: name.toUpperCase(),
                cpf,
                phone,
            });
        } else
            await client.update({
                name: name.toUpperCase(),
                cpf,
                phone,
            });

        const { total, profitTotal, vl_total_expense } = services.reduce(
            (acc, actualValue) => {
                return {
                    total: acc.total + Number(actualValue.total_accessories),
                    profitTotal:
                        acc.profitTotal + Number(actualValue.vl_profit),
                    vl_total_expense:
                        acc.vl_total_expense +
                        (Number(actualValue.total_accessories) -
                            Number(actualValue.vl_profit)),
                };
            },
            { total: 0, profitTotal: 0, vl_total_expense: 0 }
        );

        const createBudget = await Budget.create({
            observation,
            total,
            user_id,
            client_id: client.id,
            total_expense: vl_total_expense,
            total_profit: profitTotal,
        });

        await Promise.all(
            services.map(async service => {
                const {
                    service_id,
                    address,
                    linear_metter,
                    square_metter,
                    weigth,
                    gutter_id,
                    total_accessories,
                    vl_profit,
                    travel_expense,
                    general_expense,
                    profit,
                    invoice,
                } = service;

                await BudgetsServices.create({
                    service_id,
                    gutter_id,
                    budget_id: createBudget.id,
                    address,
                    total_accessories,
                    linear_metter,
                    square_metter,
                    weigth,
                    vl_profit,
                    expense_total:
                        Number(total_accessories) - Number(vl_profit),
                    travel_expense,
                    general_expense,
                    profit,
                    invoice,
                });
            })
        );

        return res.json({ message: 'success register' });
    }

    async update(req, res) {
        const { budget_id } = req.params;
        const { budget, services } = req.body;

        const schema = Yup.object().shape({
            budget: Yup.object()
                .shape({
                    name: Yup.string().required(),
                    phone: Yup.string().required(),
                    user_id: Yup.number().required(),
                })
                .required(),
            services: Yup.array()
                .of(
                    Yup.object().shape({
                        id: Yup.number(),
                        service_id: Yup.number().required(),
                        gutter_id: Yup.number().required(),
                        address: Yup.string().required(),
                        linear_metter: Yup.number().required(),
                        square_metter: Yup.number().required(),
                        weigth: Yup.number().required(),
                        total_accessories: Yup.number().required(),
                        vl_profit: Yup.number().required(),
                        travel_expense: Yup.number().required(),
                        general_expense: Yup.number().required(),
                        profit: Yup.number().required(),
                        invoice: Yup.number().required(),
                    })
                )
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Dados inválidos');
        }

        const { total, profitTotal, vl_total_expense } = services.reduce(
            (acc, actualValue) => {
                return {
                    total: acc.total + Number(actualValue.total_accessories),
                    profitTotal:
                        acc.profitTotal + Number(actualValue.vl_profit),
                    vl_total_expense:
                        acc.vl_total_expense +
                        (Number(actualValue.total_accessories) -
                            Number(actualValue.vl_profit)),
                };
            },
            { total: 0, profitTotal: 0, vl_total_expense: 0 }
        );

        const findBudget = await Budget.findByPk(budget_id);

        if (!findBudget) {
            throw new AppError('budget not found');
        }

        let client = await Client.findOne({ where: { name: budget.name } });

        if (!client) {
            client = await Client.create({
                name: budget.name.toUpperCase(),
                cpf: budget.cpf,
                phone: budget.phone,
            });
        } else
            await client.update({
                name: budget.name.toUpperCase(),
                cpf: budget.cpf,
                phone: budget.phone,
            });

        const { observation } = budget;

        await findBudget.update({
            observation,
            user_id: 1,
            total,
            client_id: client.id,
            total_expense: vl_total_expense,
            total_profit: profitTotal,
        });

        await Promise.all(
            services.map(async service => {
                const {
                    id,
                    service_id,
                    gutter_id,
                    address,
                    linear_metter,
                    square_metter,
                    weigth,
                    total_accessories,
                    vl_profit,
                    travel_expense,
                    general_expense,
                    profit,
                    invoice,
                } = service;

                /**
                 * Caso queira inserir em vez de atualizar
                 * é só não passar o ID
                 */
                await BudgetsServices.upsert({
                    id,
                    budget_id,
                    service_id,
                    gutter_id,
                    address,
                    total_accessories,
                    linear_metter,
                    square_metter,
                    weigth,
                    expense_total:
                        Number(total_accessories) - Number(vl_profit),
                    vl_profit,
                    travel_expense,
                    general_expense,
                    profit,
                    invoice,
                });
            })
        );

        return res.json({ message: 'budget updated' });
    }

    async delete(req, res) {
        const { budget_id } = req.params;

        const budget = await Budget.findByPk(budget_id);

        if (!budget) {
            throw new AppError('budget not found');
        }

        await BudgetsServices.destroy({ where: { budget_id } });
        await budget.destroy();

        return res.json({ message: 'budget deleted' });
    }
}

export default new BudgetController();
