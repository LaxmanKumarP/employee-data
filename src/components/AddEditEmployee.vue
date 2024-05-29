<template>
    <div class="modal fade" id="formModal" ref="formModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ empItem.id ? 'Edit' : 'Add' }} Employee</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                name="firstName"
                v-model="empItem.firstName"
              />
              <p class="text-danger mt-1 mb-0" v-if="!empItem.firstName && showErrors">
                Please enter first name
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                name="lastName"
                v-model="empItem.lastName"
              />
              <p class="text-danger mt-1 mb-0" v-if="!empItem.lastName && showErrors">
                Please enter last name
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label">DOB</label>
              <input
                type="text"
                class="form-control"
                placeholder="DD.MM.YYYY"
                name="dob"
                v-model="empItem.dob"
              />
              <p class="text-danger mt-1 mb-0" v-if="!empItem.dob && showErrors">
                Please enter DOB
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label">Salary</label>
              <input
                type="number"
                class="form-control"
                placeholder=""
                name="salary"
                v-model="empItem.salary"
              />
              <p class="text-danger mt-1 mb-0" v-if="!empItem.salary && showErrors">
                Please enter salary
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label">Address</label>
              <textarea
                class="form-control"
                name="body"
                rows="3"
                placeholder="Address"
                v-model="empItem.address"
              ></textarea>
              <p class="text-danger mt-1 mb-0" v-if="!empItem.address && showErrors">
                Please enter address
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
            <button type="button" class="btn btn-primary" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap/js/index.esm.js';
  import { useEmployeesStore } from '@/store/employees';
  import { mapActions, mapState } from 'pinia';
  
  export default {
    name: 'AddEditEmployee',
    data() {
      return {
        modalInstance: undefined,
        empItem: {},
        showErrors: false,
      };
    },
    mounted() {
      this.modalInstance = new Modal(this.$refs.formModal, {
        backdrop: 'static',
        keyboard: false,
      });

      this.modalInstance.show();
      this.setFormData();
    },
    computed: {
        ...mapState(useEmployeesStore, ['employeeToEdit']),
    },
    methods: {
      ...mapActions(useEmployeesStore, ['setShowAddEditModal', 'updateEmployee', 'addEmployee']),
      setFormData() {
        this.showErrors = false;
        if (this.employeeToEdit) {
          this.empItem = { ...this.employeeToEdit };
        } else {
          this.empItem = {
            firstName: '',
            lastName: '',
            dob: '',
            salary: null,
            address: '',
          };
        }
      },
      close() {
        this.setShowAddEditModal(false);
        this.showErrors = false;
        this.modalInstance.hide();
      },
      save() {
        this.showErrors = true;
        if (this.empItem.firstName && this.empItem.lastName && this.empItem.dob && this.empItem.salary && this.empItem.address ) {
            if (this.employeeToEdit) {
                this.updateEmployee(this.empItem);
            } else {
                this.addEmployee(this.empItem);
            }
          this.modalInstance.hide();
          this.setShowAddEditModal(false);
        }
      },
    },
  };
  </script>
  