import fs from "fs";
import chalk from "chalk";

export const makeDir = () => {
  const parent = "exportedData";
  const children = "stories";

  if (!fs.existsSync(parent)) {
    try {
      fs.mkdirSync(parent);

      if (!fs.existsSync(`./${parent}/${children}`)) {
        try {
          fs.mkdirSync(`./${parent}/${children}`);
        } catch (err) {
          chalk.red("Error creating directory:", err);
        }
      }
    } catch (err) {
      chalk.red("Error creating directory:", err);
    }
  }
};
