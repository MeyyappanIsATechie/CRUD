package com.app.crud.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.crud.exception.ResourceNotFoundException;
import com.app.crud.model.Employee;
import com.app.crud.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;

	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}

	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No employee with id: " + id));
		return ResponseEntity.ok(employee);
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
		Employee emp = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No employee with id: " + id));
		emp.setFirstName(employee.getFirstName());
		emp.setLastName(employee.getLastName());
		emp.setEmailId(employee.getEmailId());
		
		Employee updatedEmployee = employeeRepository.save(emp);
		
		return ResponseEntity.ok(updatedEmployee);
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee emp = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No employee with id: " + id));
		employeeRepository.delete(emp);
		Map<String, Boolean> res = new HashMap<String, Boolean>();
		res.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(res);
	}

}
