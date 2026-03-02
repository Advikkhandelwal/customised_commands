#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const picocolors_1 = __importDefault(require("picocolors"));
const program = new commander_1.Command();
program
    .name("mycli")
    .description("Simple multi-purpose CLI")
    .version("1.0.0");
program
    .command("hello")
    .description("Print greeting")
    .action(() => {
    console.log(picocolors_1.default.cyan("Hello Advik"));
});
program
    .command("add <n1> <n2>")
    .description("Add two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error(picocolors_1.default.red("Error: Please provide valid numbers."));
        return;
    }
    console.log(picocolors_1.default.green(num1 + num2));
});
program
    .command("subtract <n1> <n2>")
    .description("Subtract two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error(picocolors_1.default.red("Error: Please provide valid numbers."));
        return;
    }
    console.log(picocolors_1.default.green(num1 - num2));
});
program
    .command("multiply <n1> <n2>")
    .description("Multiply two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error(picocolors_1.default.red("Error: Please provide valid numbers."));
        return;
    }
    console.log(picocolors_1.default.green(num1 * num2));
});
program
    .command("divide <n1> <n2>")
    .description("Divide two numbers")
    .action((n1, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
        console.error(picocolors_1.default.red("Error: Please provide valid numbers."));
        return;
    }
    if (num2 === 0) {
        console.error(picocolors_1.default.red("Error: Cannot divide by zero."));
        return;
    }
    console.log(picocolors_1.default.green(num1 / num2));
});
program
    .command("weather <city>")
    .description("Get weather information for a city")
    .action(async (city) => {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`, {
            headers: {
                "User-Agent": "curl/7.64.1"
            },
            signal: AbortSignal.timeout(5000)
        });
        if (!response.ok) {
            throw new Error(`Weather service returned status ${response.status}`);
        }
        const data = await response.json();
        if (!data.current_condition || data.current_condition.length === 0) {
            console.error(picocolors_1.default.red("Error: Could not find weather data for that city."));
            return;
        }
        const current = data.current_condition[0];
        const weatherDesc = current.weatherDesc?.[0]?.value || "No description available";
        console.log(`\n${picocolors_1.default.yellow(picocolors_1.default.bold(`Weather for ${city}:`))}`);
        console.log(picocolors_1.default.dim(`-----------------------------`));
        console.log(`${picocolors_1.default.cyan("Temperature:")} ${picocolors_1.default.white(current.temp_C + "°C")}`);
        console.log(`${picocolors_1.default.cyan("Condition:")}   ${picocolors_1.default.white(weatherDesc)}`);
        console.log(`${picocolors_1.default.cyan("Humidity:")}    ${picocolors_1.default.white(current.humidity + "%")}`);
        console.log(`${picocolors_1.default.cyan("Wind Speed:")}  ${picocolors_1.default.white(current.windspeedKmph + " km/h")}`);
        console.log(picocolors_1.default.dim(`-----------------------------\n`));
    }
    catch (error) {
        if (error.name === 'TimeoutError') {
            console.error(picocolors_1.default.red("Error: Weather service timed out. The service might be slow or down."));
        }
        else {
            console.error(picocolors_1.default.red(`Error: Failed to fetch weather data. (${error.message})`));
        }
        console.log(picocolors_1.default.dim("Try visiting: https://wttr.in/" + city));
    }
});
program
    .command("quote")
    .description("Get a random inspirational quote")
    .action(async () => {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        if (!response.ok)
            throw new Error("Failed to fetch quote");
        const data = await response.json();
        const quote = data[0];
        console.log(`\n${picocolors_1.default.italic(picocolors_1.default.cyan(`"${quote.q}"`))}`);
        console.log(`${picocolors_1.default.yellow(`- ${quote.a}`)}\n`);
    }
    catch (error) {
        console.error(picocolors_1.default.red("Error: Failed to fetch quote."));
    }
});
program
    .command("pokemon <name>")
    .description("Get information about a Pokemon")
    .action(async (name) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.error(picocolors_1.default.red(`Error: Pokemon "${name}" not found.`));
                return;
            }
            throw new Error("Failed to fetch Pokemon info");
        }
        const data = await response.json();
        console.log(`\n${picocolors_1.default.yellow(picocolors_1.default.bold(`Pokemon: ${data.name.toUpperCase()}`))}`);
        console.log(`${picocolors_1.default.cyan("ID:")}      ${picocolors_1.default.white(data.id)}`);
        console.log(`${picocolors_1.default.cyan("Height:")}  ${picocolors_1.default.white(data.height)}`);
        console.log(`${picocolors_1.default.cyan("Weight:")}  ${picocolors_1.default.white(data.weight)}`);
        console.log(`${picocolors_1.default.cyan("Types:")}   ${picocolors_1.default.magenta(data.types.map((t) => t.type.name).join(", "))}\n`);
    }
    catch (error) {
        console.error(picocolors_1.default.red("Error: Failed to fetch Pokemon information."));
    }
});
program
    .command("country <name>")
    .description("Get information about a country")
    .action(async (name) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.error(picocolors_1.default.red(`Error: Country "${name}" not found.`));
                return;
            }
            throw new Error("Failed to fetch country info");
        }
        const data = await response.json();
        const country = data[0];
        console.log(`\n${picocolors_1.default.yellow(picocolors_1.default.bold(`Country:    ${country.name.common}`))}`);
        console.log(`${picocolors_1.default.cyan("Capital:    ")} ${picocolors_1.default.white(country.capital?.[0] || "N/A")}`);
        console.log(`${picocolors_1.default.cyan("Region:     ")} ${picocolors_1.default.white(country.region)}`);
        console.log(`${picocolors_1.default.cyan("Population: ")} ${picocolors_1.default.white(country.population.toLocaleString())}`);
        console.log(`${picocolors_1.default.cyan("Flag:       ")} ${picocolors_1.default.white(country.flag || "N/A")}\n`);
    }
    catch (error) {
        console.error(picocolors_1.default.red("Error: Failed to fetch country information."));
    }
});
program.parse();
