<template lang="pug">
  div
    h1.mt-4 Tasks

    b-button(v-b-modal.add-column-modal variant="outline-primary" 
      v-if="checkRole(getUserRole, 'admin', 'manager')") Add column

    #board.d-flex.align-items-start.mt-3
      #column.card.shadow.mr-4.mb-4(
        v-for="(column, index) in getCurrentProjectTasks" 
        :key="index")
        
        h5.mb-4 {{column.name}}
        draggable.p-0(
          v-model="column.tasks"  
          animation="200"
          tag="div" group="task"
          ghost-class="ghost"
          @add="addEvLog"
          @change="changeEvLog"
        )     
          transition-group.list-group.min-h(tag="ul" type="transition" name="list-flip")
            li#pointer.list-group-item.d-flex(
              class="justify-content-between  "
              v-for="(task, index) in column.tasks" :key="task.id"
              @click="selectTask(task)"
            ) 
              div#task-name {{task.taskName}}
              div
                b-badge(v-if="task.sprint" variant="primary" pill) {{task.sprint}}
        .d-flex.mt-4
          b-button.flex-1.mr-1(v-b-modal.add-task-modal variant="outline-primary" 
            @click.prevent="preopenModal(column.id)" v-if="checkRole(getUserRole, 'admin', 'manager')"): b-icon-plus-square
            
          b-button.flex-1(variant="outline-danger" @click="openDelColumnModal(column)"
            v-if="checkRole(getUserRole, 'admin', 'manager')"): b-icon-trash

    b-modal#task-modal(ref="task-modal" :title="selectedTask.taskName" hide-footer)
      .d-flex.w-100.align-items-center.justify-content-between(slot="modal-header")
        h4.mb-0.pr-4 {{selectedTask.taskName}}
        b-button(@click="openEdit()" variant="outline-primary") Edit

      h4(v-if="selectedTask.sprint"): b-badge(variant="primary") {{'Sprint ' + selectedTask.sprint}}

      .d-flex.align-items-center(v-if="selectedTask.startDate && selectedTask.endDate")
        div
          h6 Start date
          h6 End date
        div.ml-3
          h6 {{selectedTask.startDate}}
          h6 {{selectedTask.endDate}}

      div(v-if="selectedTask.user")
        label.mt-2 Task user:
        .d-flex        
          b-img#small(:src="selectedTask.user ? selectedTask.user.photoLink : ''") 
          p.ml-2 {{selectedTask.user ? selectedTask.user.firstName : ''}}

      VueMarkdown.mt-2(:source="selectedTask.taskContent === null ? selectedTask.taskContent = 'Task Content' : selectedTask.taskContent")

      p.mb-1 Owner:
      .d-flex
        b-img#small(:src="selectedTask.owner.photoLink") 
        p.ml-2 {{selectedTask.owner.firstName}}
      
      .d-flex.justify-content-center
        b-button(variant="outline-danger" @click="deleteTaskAction") Delete

    b-modal#update-task-modal(ref="update-task-modal" title="Edit task" hide-footer)
      b-form(@submit.prevent="submitUpdate")
        b-form-group(
          label="Task name"       
        )
          b-form-input(
            required
            type="text"
            placeholder="Enter task name"
            v-model="selectedTask.taskName"
          )

        b-form-group(
          label="Sprint:"
          label-for=""          
        )
          b-form-spinbutton(
            min="0"
            v-model="selectedTask.sprint"
          )
        
        label Task user
        b-form-select(v-model="selectedTask.userId" 
          :options="getCurrentProjectUsersSelect")

        label.mt-3(for="start-date") Start date
        b-form-datepicker#start-date(v-model="selectedTask.startDate")
          
        label.mt-3(for="end-date") End date
        b-form-datepicker#end-date(v-model="selectedTask.endDate")

        b-form-group.mt-3(
          label="Task content:"
          label-for="task-content"
          description="Markdown support")

          b-form-textarea#task-content(
            v-model="selectedTask.taskContent"
            placeholder="Enter something..."
            rows="3"
          )

        .d-flex.justify-content-center
          b-button(type="submit" variant="primary") Save

    b-modal#add-column-modal(ref="add-column-modal" title="Add column" hide-footer)
      b-form(@submit.prevent="addColumn()")
        label Column name
        b-form-input(type="text" required placeholder="Enter column name" v-model="newColumn")
        .d-flex.justify-content-center.mt-3
          b-button(type="submit" variant="primary") Add
    b-modal#delete-column-modal(ref="delete-column-modal" title="Deleting column" hide-footer)
      p Are you sure that you want to delete column. Changes cannot be undone
      .d-flex.justify-content-center
        b-button(variant="danger" @click="deleteColumn") Delete
    b-modal#add-task-modal(ref="add-task-modal", title="Add task" hide-footer)
      b-form(@submit.prevent="submitAdd")
        b-form-group(
          label="Task name"       
        )
          b-form-input(
            required
            type="text"
            placeholder="Enter task name"
            v-model="newTask.taskName"
          )

        b-form-group(
          label="Sprint:"
          label-for=""          
        )
          b-form-spinbutton(
            min="0"
            v-model="newTask.sprint"
          )

        label Task user
        b-form-select(v-model="newTask.userId" 
          :options="getCurrentProjectUsersSelect")

        label.mt-3(for="start-date") Start date
        b-form-datepicker#start-date(v-model="newTask.startDate")
          
        label.mt-3(for="end-date") End date
        b-form-datepicker#end-date(v-model="newTask.endDate")

        b-form-group.mt-3(
          label="Task content:"
          label-for="task-content"
          description="Markdown support")

          b-form-textarea#task-content(
            v-model="newTask.taskContent"
            placeholder="Enter something..."
            rows="3"
          )

        .d-flex.justify-content-center
          b-button(type="submit" variant="primary") Add
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";
import VueMarkdown from "vue-markdown";

export default {
  name: "ProjectTasks",
  components: { draggable, VueMarkdown },
  methods: {
    ...mapActions([
      "updateTask",
      "addTaskColumn",
      "deleteTaskColumn",
      "addTask",
      "deleteTask"
    ]),
    checkRole(role, ...accessRole) {
      return accessRole.some(r => r === role);
    },
    addEvLog(data) {
      this.ev.column = this.getCurrentProjectTasks.find(
        item => item.name === data.path[2].children[0].innerText
      );
      this.ev.element.taskColumnId = this.ev.column.id;
      this.updateTask({ taskId: this.ev.element.id, form: this.ev.element });
      this.ev = {};
    },
    changeEvLog(data) {
      if (data.added) this.ev.element = data.added.element;
    },
    selectTask(task) {
      this.selectedTask = task;
      this.$refs["task-modal"].show();
    },
    openEdit() {
      this.$refs["task-modal"].hide();
      this.$refs["update-task-modal"].show();
    },
    submitUpdate() {
      this.selectedTask.user = this.getCurrentProjectUsers.find(
        u => u.id === this.selectedTask.userId
      );
      this.updateTask({
        taskId: this.selectedTask.id,
        form: this.selectedTask
      });
      this.$refs["update-task-modal"].hide();
      this.$refs["task-modal"].show();
    },
    addColumn() {
      this.addTaskColumn({
        projectId: this.getCurrentProject.id,
        form: {
          name: this.newColumn,
          projectId: this.getCurrentProject.id,
          tasks: []
        }
      });
      this.$refs["add-column-modal"].hide();
      this.newColumn = "";
    },
    openDelColumnModal(column) {
      this.$refs["delete-column-modal"].show();
      this.deletingColumn = column;
    },
    deleteColumn() {
      this.deleteTaskColumn({
        projectId: this.getCurrentProject.id,
        columnId: this.deletingColumn.id
      });
      this.deletingColumn = {};
      this.$refs["delete-column-modal"].hide();
    },
    preopenModal(columnId) {
      this.newTask.taskColumnId = columnId;
    },
    submitAdd() {
      this.newTask.ownerId = this.getUser.id;
      this.addTask(this.newTask);
      this.newTask = {};
      this.$refs["add-task-modal"].hide();
    },
    deleteTaskAction() {
      this.deleteTask(this.selectedTask.id);
      this.$refs["task-modal"].hide();
    },
    getTaskUser(id) {
      return this.getCurrentProjectUsers.find(u => u.id === id);
    }
  },
  computed: {
    ...mapGetters([
      "getCurrentProjectTasks",
      "getCurrentProject",
      "getCurrentProjectUsers",
      "getCurrentProjectUsersSelect",
      "getUser",
      "getUserRole"
    ])
  },
  data() {
    return {
      ev: {},
      selectedTask: {
        owner: {},
        user: {}
      },
      newColumn: "",
      deletingColumn: {},
      newTask: {
        userId: null
      }
    };
  }
};
</script>

<style scoped>
#board {
  overflow-x: auto;
  overflow-y: hidden;
}

#column {
  min-width: 330px;
  min-height: 100px;
  padding: 15px;
}

#pointer {
  cursor: pointer;
}

#small {
  height: 25px;
  width: 25px;
  object-fit: cover;
  border-radius: 3px;
}

#task-name {
  max-width: 210px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.min-h {
  min-height: 50px;
}

.flex-1 {
  flex: 1;
}
</style>