import chalk from "chalk";
import ora from "ora";

export const clearSpace = async (StoryblokService) => {
  const spinner = ora("Preparing space").start();
  try {
    const responseStories = await StoryblokService.getStories();
    const responseComponents = await StoryblokService.getComponents();

    await Promise.all(
      responseStories.data.stories.map((story) =>
        StoryblokService.deleteStory(story.id),
      ),
    );

    await Promise.all(
      responseComponents.data.components.map((component) =>
        StoryblokService.deleteComponent(component.id),
      ),
    );
    spinner.succeed("Space cleared");
  } catch (error) {
    spinner.fail(
      chalk.red("Error while preapring space", JSON.stringify(error)),
    );
  }
};
