<template>
  <div>
    <div class="container fixed-top">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <router-link
          to="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span class="log-text">Employees Data</span>
        </router-link>
        <button class="btn btn-outline-primary ms-auto" @click="openAddModal">+ Add Employee</button>
      </header>
    </div>

    <div class="container main">
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useEmployeesStore } from './store/employees';

export default {
  name: 'App',
  methods: {
    ...mapActions(useEmployeesStore, ['setShowAddEditModal', 'setEmpIdToEdit']),
    openAddModal() {
      this.setShowAddEditModal(true);
      this.setEmpIdToEdit(null);
    },
  },
}
</script>

<style lang="scss">
@import './assets/styles.scss';
</style>
