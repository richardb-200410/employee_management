from django.urls import path 
from .views import create_employee, update_employee, delete_employee, employee_list, department_list
urlpatterns = [
    
    path('', employee_list,name="list"),
    path('departments/', department_list, name="department-list"),
    path('create/', create_employee,name="create"),
    path('update/<int:pk>/', update_employee,name="update"),
    path('delete/<int:pk>/', delete_employee,name="delete"),
]