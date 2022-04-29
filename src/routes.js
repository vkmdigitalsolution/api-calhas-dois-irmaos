import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import BudgetController from './app/controllers/BudgetController';
import ServiceController from './app/controllers/ServiceController';
import AccessorieController from './app/controllers/AccessorieController';
import TypesController from './app/controllers/TypesController';
import ReportController from './app/controllers/ReportController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/healthy', (req, res) => {
    return res.json({ message: 'success' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(['/users'], authMiddleware);

routes.put('/users', UserController.update);

routes.get('/types/accessories', TypesController.accessories);
routes.get('/types/services', TypesController.indexServices);
routes.get('/types/gutters', TypesController.indexGutters);

routes.get('/budgets', BudgetController.index);
routes.get('/budgets/:budget_id', BudgetController.listOneBudget);
routes.post('/budgets', BudgetController.store);
routes.put('/budgets/:budget_id', BudgetController.update);
routes.delete('/budgets/:budget_id', BudgetController.delete);

routes.get('/accessories', AccessorieController.index);
routes.post('/accessories/:id', AccessorieController.listOne);
routes.put('/accessories/:id', AccessorieController.update);

routes.post('/services', ServiceController.getServices);
routes.post('/services/register', ServiceController.store);
routes.delete('/services/:service_id', ServiceController.delete);

routes.get('/report/:budget_id', ReportController.report);

export default routes;
