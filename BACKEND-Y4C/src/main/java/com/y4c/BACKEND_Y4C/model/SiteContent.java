package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;

@Entity
@Table(name = "site_content")
public class SiteContent {

    @Id
    @Column(name = "content_key")
    private String key;
    
    @Column(columnDefinition = "TEXT")
    private String value;

    public SiteContent() {}

    public SiteContent(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
