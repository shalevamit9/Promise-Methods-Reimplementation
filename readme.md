# Node.js TS 
## ESM starter kit

This simple setup is compiles Typescript to Node.js ESM.

It is indeed experimental and can change at any time.    
Be sure to use **`.js`** extension name at the end of your import statements of your own source files.

You can tell VSCode to add **.js** extentions for you on auto-imports...    
Simply open the command pallete **`Cmd + Shift + P`**, then type   **`>open settings json`**    
and add these two lines at the root level of the configuration object:

```
"javascript.preferences.importModuleSpecifierEnding": "js"
"typescript.preferences.importModuleSpecifierEnding": "js"
```

An easier alternative you may consider is to simply dompile everything to CommonJS.
  
This setup is only relevant if it is important for you to be standard complient with ESNext and specifically with EcmaScript Modules (ESM) running natively in the Node.js runtime. 




