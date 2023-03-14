const Expense = require('../modal/expenseModal')
const path = require('path')
const rootDir = require('../util/path')

console.log("hellow i m inside controller")

exports.saveToStorage = async(req,res,next) =>{
    console.log("inside function")
    console.log(req.body)

    const amount = req.body.amountAdd
    const description = req.body.descriptionAdd
    const category = req.body.categoryAdd

    if (!amount || !description || !category) {
        return res.status(400).json({ error: 'Amount, description, and category fields are required' });
        
      }
      try {
        const data = await Expense.create({ expenseAmount:amount, description:description, category:category });
          // res.status(201).redirect('/')
        res.status(201).json({ newExpense: data })
      
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
}

exports.getAllUsers = async(req,res,next) =>{

    try{
        Expense.findAll()
        .then((users) =>{
            res.status(201).json(users)
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({ error: error });

    }
}

exports.deleteExpense = async(req,res,next) =>{
    console.log(req.params.id)
    if(!req.params.id){
        res.status(400).json({err:"Missing ExpenseID"})
    }
    try{
        const expenseId = req.params.id
        Expense.destroy({where:{id:expenseId}})
        console.log("expense Successfully destroyed")

    }catch{
        console.log(err)
        req.status(500).json({error:error})

    }
}