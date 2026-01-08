import re
from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Employee model with strict validations.
    """
    class Meta:
        model = Employee
        fields = '__all__'

    def validate_employee_name(self, value):
        """
        Check that the name contains only alphabets and spaces, and is long enough.
        """
        if len(value) < 3:
            raise serializers.ValidationError("Name must be at least 3 characters long.")
        if not re.match(r'^[a-zA-Z\s]+$', value):
            raise serializers.ValidationError("Name must only contain alphabets and spaces.")
        return value

    def validate_employee_contact(self, value):
        """
        Validate Indian contact numbers.
        Allowed formats: 9876543210, 09876543210, +919876543210, +91 9876543210
        """
        # Remove spaces and hyphens for validation
        clean_number = re.sub(r'[\s\-]', '', value)
        
        # Regex for Indian numbers: optional +91 or 0, followed by 10 digits starting with 6-9
        indian_phone_regex = r'^(\+91|0)?[6-9]\d{9}$'
        
        if not re.match(indian_phone_regex, clean_number):
            raise serializers.ValidationError(
                "Invalid Indian contact number. Must be 10 digits, optionally starting with +91 or 0."
            )
        return value

    def validate_employee_email(self, value):
        """
        Additional custom email validation if needed. 
        DRF's EmailField already handles basic format.
        """
        return value.lower() # Normalize email to lowercase
