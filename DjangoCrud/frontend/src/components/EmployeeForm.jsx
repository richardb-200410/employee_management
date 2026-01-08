import React, { useState, useEffect } from 'react';
import api from '../api';

/**
 * Modern form component designed to fit within a modal overlay.
 */
const EmployeeForm = ({ employeeToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        employee_id: '',
        employee_name: '',
        employee_email: '',
        employee_contact: '',
        employee_address: '',
    });

    useEffect(() => {
        if (employeeToEdit) {
            setFormData(employeeToEdit);
        }
    }, [employeeToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employeeToEdit) {
                await api.updateEmployee(employeeToEdit.id, formData);
            } else {
                await api.createEmployee(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving employee:', error);
            alert('Something went wrong. Please verify your input.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{employeeToEdit ? 'Update Professional' : 'Onboard New Employee'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Professional ID</label>
                        <input
                            type="text"
                            name="employee_id"
                            placeholder="e.g. EMP-101"
                            value={formData.employee_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="employee_name"
                            placeholder="John Doe"
                            value={formData.employee_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="employee_email"
                            placeholder="john@example.com"
                            value={formData.employee_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            name="employee_contact"
                            placeholder="+1 234 567 890"
                            value={formData.employee_contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Residential Address</label>
                        <textarea
                            name="employee_address"
                            placeholder="123 Modern Lane, Tech City"
                            value={formData.employee_address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-submit">
                            {employeeToEdit ? 'Save Changes' : 'Confirm Onboarding'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
