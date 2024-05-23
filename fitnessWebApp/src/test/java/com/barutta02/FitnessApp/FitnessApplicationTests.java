package com.barutta02.FitnessApp;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
@RunWith(SpringRunner.class)

@AutoConfigureMockMvc
@TestPropertySource(
  locations = "classpath:application-unitTest.yml")
class FitnessApplicationTests {

	@Test
	void contextLoads() {
	}

}
