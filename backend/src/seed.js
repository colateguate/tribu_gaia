const mongoose = require('mongoose');
const Status = require('./models/Status');
const ExpenseCategory = require('./models/ExpenseCategory');
const IncomeCategory = require('./models/IncomeCategory');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tribu_gaia';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const statuses = [
    { name: 'En curs', description: 'La tasca/projecte està actualment en curs.' },
    { name: 'Completat', description: 'La tasca/projecte s\'ha completat.' },
    { name: 'En espera', description: 'La tasca/projecte està en espera.' },
    // Afegeix aquí més estats si és necessari
];

const expenseCategories = [
    { name: 'Material', description: 'Despeses en material.' },
    { name: 'Serveis', description: 'Despeses en serveis.' },
    // Afegeix aquí més categories de despesa si és necessari
];

const incomeCategories = [
    { name: 'Matrícula', description: 'Ingressos per matrícules.' },
    { name: 'Mensualitats', description: 'Ingressos per mensualitats.' },
    // Afegeix aquí més categories d'ingrés si és necessari
];

statuses.forEach(async status => {
    const statusFound = await Status.findOne({ name: status.name });

    if (!statusFound) {
        const newStatus = new Status(status);
        await newStatus.save();
        console.log(`Estat ${status.name} creat correctament.`);
    }
});

expenseCategories.forEach(async category => {
    const categoryFound = await ExpenseCategory.findOne({ name: category.name });

    if (!categoryFound) {
        const newCategory = new ExpenseCategory(category);
        await newCategory.save();
        console.log(`Categoria de despesa ${category.name} creada correctament.`);
    }
});

incomeCategories.forEach(async category => {
    const categoryFound = await IncomeCategory.findOne({ name: category.name });

    if (!categoryFound) {
        const newCategory = new IncomeCategory(category);
        await newCategory.save();
        console.log(`Categoria d'ingrés ${category.name} creada correctament.`);
    }
});

console.log('Base de dades inicialitzada correctament.');
