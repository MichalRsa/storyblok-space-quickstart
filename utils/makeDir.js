import fs from "fs";

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
          console.error("Error creating directory:", err);
        }
      }
    } catch (err) {
      console.error("Error creating directory:", err);
    }
  }
};
