<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input type="text" placeholder="Insert task..." v-model="task.title" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <textarea cols="30" rows="10" placeholder="Insert description..." v-model="task.description" class="form-control"/>
                                </div>
                                <template v-if="edit === false">
                                    <button class="btn btn-info btn-block">Submit</button>
                                </template>
                                 <template v-else>
                                    <button class="btn btn-info btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Options</th>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks">
                                <td>{{ task.title }}</td>
                                <td>{{ task.description }}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                                    <button @click="updateTask(task._id)" class="btn btn-success">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    class Task {
        constructor(title, description) {
            this.title = title,
            this.description = description
        }
    }
    export default {
        data () {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit : ''
            }
        },
        methods: {
            addTask() {
                if (this.edit === false) {
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json(res))
                    .then(data => {
                        this.getTasks()
                    })
            } else {
                 fetch('/api/tasks/' + this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json(res))
                    .then(data => {
                        this.getTasks()
                        this.edit = false
                    })
            }

                this.task = new Task()
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json(res))
                    .then(data => {
                        this.tasks = data
                        console.log(this.tasks)
                    })
            },
            deleteTask (id) {
                fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks()
                })
            },
            updateTask (id) {
                fetch('/api/tasks/' + id)
                .then(res => res.json())
                .then(data => {
                    this.task = new Task(data.title, data.description)
                    this.taskToEdit = data._id
                    this.edit = true
                })
            }
        },
        created() {
            this.getTasks()
        }
    }
</script>

<style scoped>

</style>
