import pc from "picocolors";

const log = {
  info: (msg: string) => {
    console.log(pc.white(msg));
  },

  success: (msg: string) => {
    console.log(pc.green("✓"), msg);
  },

  warn: (msg: string) => {
    console.log(pc.yellow("⚠"), msg);
  },

  error: (msg: string) => {
    console.log(pc.red("✗"), msg);
  },

  file: (msg: string) => {
    console.log(pc.dim(msg));
  },

  section: (msg: string) => {
    console.log(pc.bold(msg));
  },
};

export default log;
