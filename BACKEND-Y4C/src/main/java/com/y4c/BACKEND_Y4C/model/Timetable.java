package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;

@Entity
@Table(name = "timetables")
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String activity;
    private String location;

    public Timetable() {}

    public Timetable(Long id, String dayOfWeek, String startTime, String endTime, String activity, String location) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
        this.location = location;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
