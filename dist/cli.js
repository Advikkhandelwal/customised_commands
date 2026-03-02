#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
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
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error("Error: Please provide valid numbers.");
        return;
    }
    console.log(num1 + num2);
});
program
    .command("subtract <n1> <n2>")
    .description("Subtract two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error("Error: Please provide valid numbers.");
        return;
    }
    console.log(num1 - num2);
});
program
    .command("multiply <n1> <n2>")
    .description("Multiply two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error("Error: Please provide valid numbers.");
        return;
    }
    console.log(num1 * num2);
});
program
    .command("divide <n1> <n2>")
    .description("Divide two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error("Error: Please provide valid numbers.");
        return;
    }
    if (num2 === 0) {
        console.error("Error: Cannot divide by zero.");
        return;
    }
    console.log(num1 / num2);
});
program
    .command("weather <city>")
    .description("Get weather information for a city")
    .action(async (city) => {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            throw new Error(`Weather service returned ${response.status}`);
        }
        const data = await response.json();
        if (!data.current_condition || data.current_condition.length === 0) {
            console.error("Error: Could not find weather data for that city.");
            return;
        }
        const current = data.current_condition[0];
        const weatherDesc = current.weatherDesc?.[0]?.value || "No description available";
        console.log(`\nWeather for ${city}:`);
        console.log(`-----------------------------`);
        console.log(`Temperature: ${current.temp_C}°C`);
        console.log(`Condition:   ${weatherDesc}`);
        console.log(`Humidity:    ${current.humidity}%`);
        console.log(`Wind Speed:  ${current.windspeedKmph} km/h`);
        console.log(`-----------------------------\n`);
    }
    catch (error) {
        console.error("Error: Failed to fetch weather data. Check your connection or city name.");
    }
});
program.parse();
