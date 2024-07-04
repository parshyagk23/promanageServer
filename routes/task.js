const express = require("express");
const router = express.Router();
const Task = require("../model/taskData");
const verifyJwt = require("../middlewares/VerifyToken");
const taskController = require('../controller/task')

router.post("/posttask/:id",verifyJwt.verifyToken,taskController.PostTask);

router.patch('/movetoblog/:id',verifyJwt.verifyToken,taskController.MoveTask)

router.get("/gettask/:id",verifyJwt.verifyToken,taskController.GetTask);
  

router.delete('/deletetask/:id',verifyJwt.verifyToken,taskController.DeleteTask)


router.patch('/edittask/:id',verifyJwt.verifyToken,taskController.UpdateTask );

router.get('/sharetask/:id', taskController.getShareTask)



module.exports = router;
