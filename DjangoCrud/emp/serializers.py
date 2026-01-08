from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Employee model.
    Converts Employee instances into JSON format and vice-versa.
    """
    class Meta:
        model = Employee
        # Include all fields from the model to be accessible in the API
        fields = '__all__'
