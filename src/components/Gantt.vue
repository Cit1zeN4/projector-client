<template lang="pug">
  div
    GSTC(v-if="isLoaded" :config="config")
</template>

<script>
import GSTC from "vue-gantt-schedule-timeline-calendar";
import { mapGetters } from "vuex";

export default {
  name: "Gantt",
  components: {
    GSTC
  },
  computed: {
    ...mapGetters(["getCurrentProjectTasks"]),
    parsed: function() {
      //let counter = 1;
      const rows = {};
      const items = {};
      if (this.getCurrentProjectTasks)
        this.getCurrentProjectTasks.forEach(column => {
          column.tasks.forEach(task => {
            console.log(task);
            if (task.startDate && task.endDate) {
              rows[task.id] = {
                id: task.id,
                label: task.taskName,
                user: task.user ? task.user.firstName : "No one"
              };
              items[task.id] = {
                id: task.id,
                rowId: task.id,
                label: task.taskName,
                time: {
                  start: new Date(task.startDate).getTime(),
                  end: new Date(task.endDate).getTime()
                }
              };
              //counter++;
            }
          });
        });
      return { rows, items };
    },
    isLoaded: function() {
      let result = false;
      if (this.getCurrentProjectTasks.length) result = true;
      return result;
    },
    config: function() {
      return this.parsed
        ? {
            height: 300,
            list: {
              rows: this.parsed.rows,
              columns: {
                data: {
                  id: {
                    id: "id",
                    data: "id",
                    width: 40,
                    header: {
                      content: "ID"
                    }
                  },
                  label: {
                    id: "label",
                    data: "label",
                    width: 200,
                    header: {
                      content: "Label"
                    }
                  },
                  user: {
                    id: "user",
                    data: "user",
                    width: 80,
                    header: {
                      content: "User"
                    }
                  }
                }
              }
            },
            chart: {
              items: this.parsed.items
            }
          }
        : {};
    }
  },
  data() {
    return {};
  }
};
</script>

