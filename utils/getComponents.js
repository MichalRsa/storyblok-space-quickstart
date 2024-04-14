import fs from "fs";
import chalk from "chalk";
import ora from "ora";

export const getComponents = async (StoryblokService) => {
  const spinner = ora("Fetching components from Storyblok").start();

  try {
    const response = await StoryblokService.getComponents();

    spinner.succeed("Components fetched");

    const componentGroups = response.data.component_groups;

    const components = response.data.components.map((component) => {
      return {
        ...component,
        groupName: componentGroups.find(
          (group) => group.uuid === component.component_group_uuid,
        ).name,
      };
    });

    spinner.start("Creating component_groups.json file");
    await fs.promises
      .writeFile(
        "exportedData/component_group.json",
        JSON.stringify(componentGroups, null, 2),
      )
      .then(() =>
        spinner.succeed(
          chalk.green("Data written to file - component_group.json"),
        ),
      )
      .catch((error) =>
        spinner.fail(
          chalk.red("Error while writting to component_group.json file", error),
        ),
      );

    spinner.start("Creating component.json file");
    await fs.promises
      .writeFile(
        "exportedData/components.json",
        JSON.stringify(components, null, 2),
      )
      .then(() => {
        spinner.succeed(chalk.green("Data written to file - components.json"));
      })
      .catch((error) =>
        spinner.fail(
          chalk.red("Error while writting to component.json file", error),
        ),
      );
    spinner.succeed("Components added");
  } catch (error) {
    spinner.fail(chalk.red("Error while fetching components", error));
  }
};
