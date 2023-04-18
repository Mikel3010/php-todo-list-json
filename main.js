const app = new Vue({
    el: '#app',
    data: {
      tasks: [],
      newTaskText: ''
    },
    methods: {
      addTask() {
        const text = this.newTaskText.trim();
        if (text) {
          axios.post('server.php', { text, done: false })
            .then(response => {
              this.tasks.push(response.data);
              this.newTaskText = '';
            })
            .catch(error => console.error(error));
        }
      },
      toggleTask(index) {
        const task = this.tasks[index];
        axios.put(`server.php?id=${task.id}`, { done: !task.done })
          .then(response => {
            this.tasks[index] = response.data;
          })
          .catch(error => console.error(error));
      },
      deleteTask(index) {
        const task = this.tasks[index];
        axios.delete(`server.php?id=${task.id}`)
          .then(() => {
            this.tasks.splice(index, 1);
          })
          .catch(error => console.error(error));
      }
    },
    mounted() {
      axios.get('todo-list.json')
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => console.error(error));
    }
  });