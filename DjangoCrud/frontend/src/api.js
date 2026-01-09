import axios from 'axios';

// The base URL for our Django backend API
const API_BASE_URL = 'http://localhost:8000/emp/';

/**
 * Service to handle all API communications with the Django backend.
 */
const api = {
    // GET: Fetch all employees
    getEmployees: () => axios.get(API_BASE_URL),

    // POST: Create a new employee
    createEmployee: (data) => axios.post(`${API_BASE_URL}create/`, data),

    // PATCH: Update an existing employee (partial update)
    updateEmployee: (id, data) => axios.patch(`${API_BASE_URL}update/${id}/`, data),

    // DELETE: Remove an employee
    deleteEmployee: (id) => axios.delete(`${API_BASE_URL}delete/${id}/`),

    // GET: Fetch all departments
    getDepartments: () => axios.get(`${API_BASE_URL}departments/`),
};

export default api;
