package com.y4c.BACKEND_Y4C;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.page.AppShellConfigurator;

@SpringBootApplication
@Import(SecurityConfig.class)
@StyleSheet("styles.css")
public class BackendY4CApplication implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(BackendY4CApplication.class, args);
    }
}
