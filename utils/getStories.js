import fs from "fs";
import chalk from "chalk";
import ora from "ora";

export const getStories = async (StoryblokService) => {
  const spinner = ora("Fetching stories from Storyblok").start();

  try {
    const response = await StoryblokService.getStories();

    spinner.succeed("Stories fetched");

    const storiesId = response.data.stories.map((story) => story.id);

    spinner.start("Creating stories files");

    await Promise.all(
      storiesId.map(async (id) => {
        const response = await StoryblokService.getStory(id);
        const name = response.data.story.slug;
        const isFolder = response.data.story.is_folder;

        const fileName = isFolder ? `folder_${name}` : name;

        try {
          await fs.promises.writeFile(
            `exportedData/stories/${fileName}.json`,
            JSON.stringify(response.data.story, null, 2),
          );
        } catch (error) {
          spinner.fail(chalk.red(`Error while writting ${fileName}`, error));
        }
      }),
    );
    spinner.succeed(chalk.green.bold("Stories directory added"));
  } catch (error) {
    spinner.fail(chalk.red("Error while fetching stories data", error));
  }
};
