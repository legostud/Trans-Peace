#!/usr/bin/env node
import { exec } from "node:child_process";
import dotenv from 'dotenv'
dotenv.config("../.env");
console.log(process.env.GH_PAT); // remove this after you've confirmed it is working


function updateFile(file){
    console.log("token=",process.env.GH_PAT);
    console.log("Adding Github tokent to your shell environment.");
    try {
        exec(`echo "\nexport GH_PAT=${process.env.GH_PAT}" >> ${file}`,
         (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("Successfully added GH_PAT");
        });
         exec(`source ${file}`,
         (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("Restarting shell");
         });
      } catch(err) {
        console.error(err)
      }
}

if(process.env.SHELL==="/bin/zsh"){
    updateFile("~/.zshrc");
}else if(process.env.SHELL==="/bin/bash"){
    updateFile("~/.bashrc");
}



