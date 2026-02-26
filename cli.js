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
program.parse();
//# sourceMappingURL=cli.js.map