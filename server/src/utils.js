export const updateUserBalance = async (prisma, userId) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      incomes: true,
      expenses: true
    }
  });
  
  const incomesSummed = user.incomes.reduce((acc, income) => acc + income.amount, 0);
  const expensesSummed = user.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      balance: incomesSummed - expensesSummed
    }
  });
}