const Task = require('../models/Task'); 

const createTask = async (req, res) => {

    try {

        const { state, user, ...body } = req.body;

        const taskDB = await Task.findOne({ name: body.name });

        if ( taskDB ){
            return res.status(400).
            json({msg: `The product ${ taskDB.name } exists`});
        }
        
        // Data a guardar
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.userAuth._id,
        }

        const task = new Task( data );
        await task.save();

        res.status(201).json({task, verify: true}); 
        
    } catch (error) {
        console.log(error)
    }

}


const getTasks = async (req, res) =>{

    const { init = 0, limit = 5 } = req.query;

    const [ total, tasks ] = await Promise.all([
        Task.countDocuments({ state: true }),
        Task.find({ state: true })
            .populate('user', 'name')
            .skip( Number( init ) )
            .limit( Number( limit ) )
    ]);

    res.status(201).json({total, tasks, verify: true});
}

const updateTask = async (req, res) =>{

    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userAuth._id;

    const update = await Task.findByIdAndUpdate( data._id, data, { new: true } );

    res.status(201).json({update, data, verify: true});

}

const deleteTask = async (req, res) =>{
   
    const { task_id } = req.params;
    const deleteC = await Task.findByIdAndUpdate( task_id, { state: false }, { new: true } ); 

    res.status(201).json({delete: deleteC, verify: true});

}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} 