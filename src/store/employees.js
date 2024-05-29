import { defineStore } from 'pinia'
import employeesData from '@/assets/employeesData'

export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    employees: employeesData,
    showAddEditModal: false,
    empIdToEdit: null
  }),
  getters: {
    employeeToEdit() {
      return this.employees.find((emp) => emp.id === this.empIdToEdit)
    }
  },
  actions: {
    deleteEmployee(empId) {
      const empIndex = this.employees.findIndex((emp) => emp.id === empId)
      this.employees.splice(empIndex, 1)
    },
    setShowAddEditModal(payload) {
      this.showAddEditModal = payload
    },
    setEmpIdToEdit(payload) {
      this.empIdToEdit = payload
    },
    addEmployee(payload) {
      const lastEmpInList = this.employees[this.employees.length - 1]
      this.employees.push({
        id: lastEmpInList.id + 1,
        ...payload
      })
    },
    updateEmployee(payload) {
      let empEditItemIndex = this.employees.findIndex((emp) => emp.id === payload.id)
      this.employees[empEditItemIndex] = payload
    }
  }
})
