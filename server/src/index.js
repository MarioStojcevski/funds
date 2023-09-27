import express from 'express';
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const prisma = new PrismaClient();

// Fetch user data
app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userData = await prisma.user.findFirst({
    select: {
      id: true,
      username: true,
      createdAt: true,
      balance: true,
      incomes: {
        select: {
          id: true,
          amount: true,
          description: true,
          categoryId: true,
        }
      },
      expenses: {
        select: {
          id: true,
          amount: true,
          description: true,
          categoryId: true,
        }
      }
    },
    where: {
      id: userId
    },
  });

  return res.json(userData);
});

// Create a new income
app.post('/income/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { amount, description, categoryId } = req.body;
  const newIncome = await prisma.income.create({
    data: {
      amount: parseInt(amount),
      description,
      category: {
        connect: {
          id: categoryId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return res.json(newIncome);
});

// Create a new expense
app.post('/expense/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { amount, description, categoryId } = req.body;
  const newExpense = await prisma.expense.create({
    data: {
      amount: parseInt(amount),
      description,
      category: {
        connect: {
          id: categoryId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return res.json(newExpense);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});