from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer

# Create your API views here.

@api_view(['GET'])
def employee_list(request):
    """
    List all employees.
	Method: GET
	Endpoint: /emp/
    """
    # Fetch all employee objects from the database
    employees = Employee.objects.all()
    # Serialize the employee list into JSON format
    serializer = EmployeeSerializer(employees, many=True)
    # Return the JSON response with the serialized data
    return Response(serializer.data)


@api_view(['POST'])
def create_employee(request):
    """
    Create a new employee record.
	Method: POST
	Endpoint: /emp/create/
    """
    # Initialize the serializer with data from the request body
    serializer = EmployeeSerializer(data=request.data)
    # Validate the data against model rules
    if serializer.is_valid():
        # Save the new employee object to the database
        serializer.save()
        # Return success response with created data
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Return error response if validation fails
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'PUT'])
def update_employee(request, pk):
    """
    Update an existing employee.
	Method: PUT/PATCH
	Endpoint: /emp/update/<id>/
    """
    try:
        # Fetch the employee by its primary key (id)
        employee = Employee.objects.get(id=pk)
    except Employee.DoesNotExist:
        # Return 404 if employee not found
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    # Initialize serializer with existing object and new data
    # partial=True allows for PATCH requests where only some fields are updated
    serializer = EmployeeSerializer(employee, data=request.data, partial=True)
    
    if serializer.is_valid():
        # Save the updated data
        serializer.save()
        # Return the updated object
        return Response(serializer.data)
    # Return error response if validation fails
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_employee(request, pk):
    """
    Delete an employee.
	Method: DELETE
	Endpoint: /emp/delete/<id>/
    """
    try:
        # Fetch the employee object
        employee = Employee.objects.get(id=pk)
    except Employee.DoesNotExist:
        # Return 404 if not found
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    # Delete the record from the database
    employee.delete()
    # Return a success message
    return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)