const { Schema, model } = require('mongoose');

const TaskSchema = Schema(
    {
        user:{
			type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
		},
        name:{
            type: String,
            require:true,
            required: [true, 'Mandatory name']
        },
        description:{
            type: String,
            require:true,
            required: [true, 'Mandatory description']
        },
        tag:{
            type: String,
            require:true,
            required: [true, 'Mandatory tag'],
        },
        date:{
            type: Date,
            require:true,
            required: [true, 'Mandatory date'],
        },
        hour: {
            type: String,
        },
        img:{
            type: String,
            require:true,
            required: [true, 'Mandatory img'],
        },
        state:{
            type: Boolean,
            default: true,
            required: true
        }
    }
);

TaskSchema.methods.toJSON = function() {
    const { __v, ...task } = this.toObject();
    return task;
}

module.exports = model('Task', TaskSchema);