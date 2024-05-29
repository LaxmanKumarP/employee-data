<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Employee Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">DOB</th>
          <th scope="col">Salary</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emp, i) of employees" :key="i">
          <td>{{ emp.id }}</td>
          <td>{{ emp.firstName }}</td>
          <td>{{ emp.lastName }}</td>
          <td>{{ emp.dob }}</td>
          <td>{{ emp.salary }}</td>
          <td>{{ emp.address }}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-outline-primary" @click="editEmployee(emp.id)">Edit</button>
              <button type="button" class="btn btn-outline-primary" @click="deleteEmployee(emp.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <AddEditEmployee v-if="showAddEditModal"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useEmployeesStore } from '@/store/employees';
import AddEditEmployee from '@/components/AddEditEmployee.vue';

export default {
  name: 'Home',
  components: {
    AddEditEmployee
  },
  computed: {
    ...mapState(useEmployeesStore, [
      'employees',
      'showAddEditModal'
    ]),
  },
  methods: {
    ...mapActions(useEmployeesStore, [
      'deleteEmployee',
      'setEmpIdToEdit',
      'setShowAddEditModal',
    ]),
    editEmployee(empId) {
      this.setEmpIdToEdit(empId);
      this.setShowAddEditModal(true);
    }
  }
}
</script>

