
const PostTask = async (req, res) => {
    const { id: userId } = req.params;
    const { title, priority, todos, dueDate } = req.body;
    if (!title || !priority || !todos || !userId) {
        return res.status(400).json({
            errorMessage: "Bad Request",
        });
    }
    const taskData = await Task.create({
        title,
        priority,
        todos,
        dueDate,
        userId,
    });

    res.status(200).json({ message: "success", taskData });
}

const MoveTask = async (req, res) => {
    const { id: taskId } = req.params;
    const { blog } = req.body;
    if (!blog || !taskId) {
        return res.status(400).json({ errorMessage: 'Bad Request' })
    }
    try {
        const response = await Task.updateOne(
            { _id: taskId },
            { $set: { blog } }
        )
        if (response) {
            res.status(200).json({ message: 'updated successfully' })
        }
    } catch (error) {
        console.log(error)
    }

}

const GetTask = async (req, res) => {
    const { id: userId } = req.params;

    if (!userId) {
        return res.status(400).json({ errorMessage: "Bad Request" });
    }

    try {
        const tasks = await Task.find({ _id: userId });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ errorMessage: "Tasks not found" });
        }

        // Organizing tasks by blog
        const stepWiseData = {};
        tasks.forEach(task => {
            if (stepWiseData[task.blog]) {
                stepWiseData[task.blog].push(task);
            } else {
                stepWiseData[task.blog] = [task];
            }
        });


        res.status(200).json(stepWiseData);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

const UpdateTask = async (req, res) => {
    const { id: taskId } = req.params
    if (!taskId) {
        return res.status(400).json({
            errorMessage: "Bad Request",
        });
    }
    try {
        const response = await Task.findByIdAndDelete({ _id: taskId })
        res.status(200).json({ response })
    } catch (error) {
        res.status(400).json({ errorMessage: error })
    }


}
const getShareTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        if (!taskId) {
            return res.status(404).json({ errorMessage: 'Task Not Found' })
        }
        const responce = await Task.findOne({ _id: taskId })
        if (responce) {
            res.status(200).json({ responce })
        }
    } catch (error) {
        return res.status(500).json({ errorMessage: 'Something went wrong' })
    }
}
const DeleteTask = async (req, res) => {
    const { id: taskId } = req.params
    if (!taskId) {
        return res.status(400).json({
            errorMessage: "Bad Request",
        });
    }
    try {
        const response = await Task.findByIdAndDelete({ _id: taskId })
        res.status(200).json({ response })
    } catch (error) {
        res.status(400).json({ errorMessage: error })
    }


}

module.exports = { PostTask, MoveTask, GetTask, UpdateTask, getShareTask,DeleteTask }