import fs from "fs";
import chalk from "chalk";
import ora from "ora";

export const pushComponents = async (StoryblokService) => {
  const componentGroups = JSON.parse(
    fs.readFileSync("exportedData/component_group.json", "utf8"),
  );

  const spinner = ora("Uploading component groups").start();

  const groups = await Promise.all(
    componentGroups.map((group) =>
      StoryblokService.postComponentGroups(group.name)
        .then((response) => {
          return response.data.component_group;
        })
        .catch((error) => {
          spinner.fail(
            chalk.red(
              "Error while creating component groups",
              JSON.stringify(error),
            ),
          );
        }),
    ),
  ).then((data, error) => {
    if (error) return;
    spinner.succeed(chalk.green("Component groups created"));
    return data;
  });

  const components = JSON.parse(
    fs.readFileSync("exportedData/components.json", "utf8"),
  );

  spinner.start("Uploading components");

  await Promise.all(
    components.map(async (component) =>
      StoryblokService.postComponent({
        component: {
          ...component,
          component_group_uuid: groups.find(
            (group) => group.name === component.groupName,
          ).uuid,
        },
      }).catch((error) => {
        spinner.error(chalk.red("Error while creating components", error));
      }),
    ),
  ).then((_data, error) => {
    if (error) return;
    spinner.succeed(chalk.green("Components created"));
  });
};
