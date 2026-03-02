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
  .action((n1: string, n2: string) => {
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
  .action((n1: string, n2: string) => {
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
  .action((n1: string, n2: string) => {
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
  .action((n1: string, n2: string) => {
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
  .action(async (city: string) => {
    try {
      // Adding a User-Agent header can sometimes bypass rate limiting or generic blocks
      const response = await fetch(`https://wttr.in/${city}?format=j1`, {
        headers: {
          "User-Agent": "curl/7.64.1"
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`Weather service returned status ${response.status}`);
      }

      const data: any = await response.json();

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
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        console.error("Error: Weather service timed out. The service might be slow or down.");
      } else {
        console.error(`Error: Failed to fetch weather data. (${error.message})`);
      }
      console.log("Try visiting: https://wttr.in/" + city);
    }
  });

program
  .command("quote")
  .description("Get a random inspirational quote")
  .action(async () => {
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      if (!response.ok) throw new Error("Failed to fetch quote");
      const data: any = await response.json();
      const quote = data[0];
      console.log(`\n"${quote.q}"`);
      console.log(`- ${quote.a}\n`);
    } catch (error) {
      console.error("Error: Failed to fetch quote.");
    }
  });

program
  .command("pokemon <name>")
  .description("Get information about a Pokemon")
  .action(async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Error: Pokemon "${name}" not found.`);
          return;
        }
        throw new Error("Failed to fetch Pokemon info");
      }
      const data: any = await response.json();
      console.log(`\nPokemon: ${data.name.toUpperCase()}`);
      console.log(`ID:      ${data.id}`);
      console.log(`Height:  ${data.height}`);
      console.log(`Weight:  ${data.weight}`);
      console.log(`Types:   ${data.types.map((t: any) => t.type.name).join(", ")}\n`);
    } catch (error) {
      console.error("Error: Failed to fetch Pokemon information.");
    }
  });

program
  .command("country <name>")
  .description("Get information about a country")
  .action(async (name: string) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Error: Country "${name}" not found.`);
          return;
        }
        throw new Error("Failed to fetch country info");
      }
      const data: any = await response.json();
      const country = data[0];
      console.log(`\nCountry:    ${country.name.common}`);
      console.log(`Capital:    ${country.capital?.[0] || "N/A"}`);
      console.log(`Region:     ${country.region}`);
      console.log(`Population: ${country.population.toLocaleString()}`);
      console.log(`Flag:       ${country.flag || "N/A"}\n`);
    } catch (error) {
      console.error("Error: Failed to fetch country information.");
    }
  });

program.parse();