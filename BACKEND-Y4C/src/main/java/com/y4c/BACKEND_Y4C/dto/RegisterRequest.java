package com.y4c.BACKEND_Y4C.dto;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;
    private String status;
    private Boolean isStudent;
    private String registrationNumber;
    private String program;
    private String yearOfStudy;
    private String university;

    public RegisterRequest() {}

    public RegisterRequest(String name, String email, String password, String role, String status, Boolean isStudent, String registrationNumber, String program, String yearOfStudy, String university) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.isStudent = isStudent;
        this.registrationNumber = registrationNumber;
        this.program = program;
        this.yearOfStudy = yearOfStudy;
        this.university = university;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Boolean getIsStudent() { return isStudent; }
    public void setIsStudent(Boolean isStudent) { this.isStudent = isStudent; }
    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
    public String getYearOfStudy() { return yearOfStudy; }
    public void setYearOfStudy(String yearOfStudy) { this.yearOfStudy = yearOfStudy; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
}
