#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("mycli")
  .description("Simple calculator CLI")
  .version("1.0.0");

program
  .command("hello")
  .description("Print greeting")
  .action(() => {
    console.log("Hello Advik");
  });

program
  .command("add <n1> <n2>")
  .description("Add two numbers")
  .action((n1, n2) => console.log(Number(n1) + Number(n2)));

program
  .command("subtract <n1> <n2>")
  .description("Subtract two numbers")
  .action((n1, n2) => console.log(Number(n1) - Number(n2)));

program
  .command("multiply <n1> <n2>") 
  .description("Multiply two numbers")
  .action((n1, n2) => console.log(Number(n1) * Number(n2)));

program
  .command("divide <n1> <n2>")
  .description("Divide two numbers")
  .action((n1, n2) => {
    const num2 = Number(n2);
    if (num2 === 0) {
      console.log("Cannot divide by zero");
      return;
    }
    console.log(Number(n1) / num2);
  });
program
  .command("weather <city>")
  .description("Get weather information for a city")
  .action(async (city: string) => {
    try {
      const response = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      const data = await response.json();

      const current = data.current_condition[0];

      console.log(`City: ${city}`);
      console.log(`Temperature: ${current.temp_C}°C`);
      console.log(`Condition: ${current.weatherDesc[0].value}`);
      console.log(`Humidity: ${current.humidity}%`);
      console.log(`Wind Speed: ${current.windspeedKmph} km/h`);
    } catch (error) {
      console.log("Failed to fetch weather data");
    }
  });
  
program.parse();