import chalk from "chalk";
import ora from "ora";

export const clearSpace = async (StoryblokService, elements) => {
  const spinner = ora("Preparing space").start();
  try {
    const responseStories = await StoryblokService.getStories();
    const responseComponents = await StoryblokService.getComponents();

    if (elements.includes("stories")) {
      await Promise.all(
        responseStories.data.stories.map((story) =>
          StoryblokService.deleteStory(story.id),
        ),
      ).catch((error) => {
        spinner.fail(
          chalk.red("Error while deleting storie", JSON.stringify(error)),
        );
        throw error;
      });
    }

    if (elements.includes("components")) {
      await Promise.all(
        responseComponents.data.components.map((component) =>
          StoryblokService.deleteComponent(component.id),
        ),
      ).catch((error) => {
        spinner.fail(
          chalk.red("Error while deleting components", JSON.stringify(error)),
        );
        throw error;
      });

      await Promise.all(
        responseComponents.data.component_groups.map((group) =>
          StoryblokService.deleteComponentGroup(group.id),
        ),
      ).catch((error) => {
        spinner.fail(
          chalk.red(
            "Error while deleting component groups",
            JSON.stringify(error),
          ),
        );
        throw error;
      });
    }

    spinner.succeed("Space cleared");
  } catch {
    spinner.fail(
      chalk.red(
        "Something went wrong while preparing space. Retry or try removing items manually",
      ),
    );
    process.exit(1);
  }
};
