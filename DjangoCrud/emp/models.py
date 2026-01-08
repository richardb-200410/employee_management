from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    employee_name = models.CharField(max_length=100)
    employee_email = models.EmailField()
    employee_contact = models.CharField(max_length=15)
    employee_address = models.CharField(max_length=255)

    def __str__(self):
        return self.employee_name