#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";

const program = new Command();

program
  .name("mycli")
  .description("Simple multi-purpose CLI")
  .version("1.0.0");

program
  .command("hello")
  .description("Print greeting")
  .action(() => {
    console.log(pc.cyan("Hello Advik"));
  });

program
  .command("add <n1> <n2>")
  .description("Add two numbers")
  .action((n1: string, n2: string) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
      console.error(pc.red("Error: Please provide valid numbers."));
      return;
    }
    console.log(pc.green(num1 + num2));
  });

program
  .command("subtract <n1> <n2>")
  .description("Subtract two numbers")
  .action((n1: string, n2: string) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
      console.error(pc.red("Error: Please provide valid numbers."));
      return;
    }
    console.log(pc.green(num1 - num2));
  });

program
  .command("multiply <n1> <n2>")
  .description("Multiply two numbers")
  .action((n1: string, n2: string) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
      console.error(pc.red("Error: Please provide valid numbers."));
      return;
    }
    console.log(pc.green(num1 * num2));
  });

program
  .command("divide <n1> <n2>")
  .description("Divide two numbers")
  .action((n1: string, n2: string) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    if (isNaN(num1) || isNaN(num2)) {
      console.error(pc.red("Error: Please provide valid numbers."));
      return;
    }
    if (num2 === 0) {
      console.error(pc.red("Error: Cannot divide by zero."));
      return;
    }
    console.log(pc.green(num1 / num2));
  });

program
  .command("weather <city>")
  .description("Get weather information for a city")
  .action(async (city: string) => {
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

      const data: any = await response.json();

      if (!data.current_condition || data.current_condition.length === 0) {
        console.error(pc.red("Error: Could not find weather data for that city."));
        return;
      }

      const current = data.current_condition[0];
      const weatherDesc = current.weatherDesc?.[0]?.value || "No description available";

      console.log(`\n${pc.yellow(pc.bold(`Weather for ${city}:`))}`);
      console.log(pc.dim(`-----------------------------`));
      console.log(`${pc.cyan("Temperature:")} ${pc.white(current.temp_C + "°C")}`);
      console.log(`${pc.cyan("Condition:")}   ${pc.white(weatherDesc)}`);
      console.log(`${pc.cyan("Humidity:")}    ${pc.white(current.humidity + "%")}`);
      console.log(`${pc.cyan("Wind Speed:")}  ${pc.white(current.windspeedKmph + " km/h")}`);
      console.log(pc.dim(`-----------------------------\n`));
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        console.error(pc.red("Error: Weather service timed out. The service might be slow or down."));
      } else {
        console.error(pc.red(`Error: Failed to fetch weather data. (${error.message})`));
      }
      console.log(pc.dim("Try visiting: https://wttr.in/" + city));
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
      console.log(`\n${pc.italic(pc.cyan(`"${quote.q}"`))}`);
      console.log(`${pc.yellow(`- ${quote.a}`)}\n`);
    } catch (error) {
      console.error(pc.red("Error: Failed to fetch quote."));
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
          console.error(pc.red(`Error: Pokemon "${name}" not found.`));
          return;
        }
        throw new Error("Failed to fetch Pokemon info");
      }
      const data: any = await response.json();
      console.log(`\n${pc.yellow(pc.bold(`Pokemon: ${data.name.toUpperCase()}`))}`);
      console.log(`${pc.cyan("ID:")}      ${pc.white(data.id)}`);
      console.log(`${pc.cyan("Height:")}  ${pc.white(data.height)}`);
      console.log(`${pc.cyan("Weight:")}  ${pc.white(data.weight)}`);
      console.log(`${pc.cyan("Types:")}   ${pc.magenta(data.types.map((t: any) => t.type.name).join(", "))}\n`);
    } catch (error) {
      console.error(pc.red("Error: Failed to fetch Pokemon information."));
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
          console.error(pc.red(`Error: Country "${name}" not found.`));
          return;
        }
        throw new Error("Failed to fetch country info");
      }
      const data: any = await response.json();
      const country = data[0];
      console.log(`\n${pc.yellow(pc.bold(`Country:    ${country.name.common}`))}`);
      console.log(`${pc.cyan("Capital:    ")} ${pc.white(country.capital?.[0] || "N/A")}`);
      console.log(`${pc.cyan("Region:     ")} ${pc.white(country.region)}`);
      console.log(`${pc.cyan("Population: ")} ${pc.white(country.population.toLocaleString())}`);
      console.log(`${pc.cyan("Flag:       ")} ${pc.white(country.flag || "N/A")}\n`);
    } catch (error) {
      console.error(pc.red("Error: Failed to fetch country information."));
    }
  });

program.parse();