import fs from "fs";
import chalk from "chalk";
import ora from "ora";

export const pushStories = (StoryblokService) => {
  const spinner = ora();

  fs.readdir("exportedData/stories/", async (err, files) => {
    if (err) {
      spinner.fail(chalk.red("Error reading directory:", err));
      return;
    }

    const stories = [];
    const folders = [];

    files.forEach((file) => {
      const story = JSON.parse(
        fs.readFileSync(`exportedData/stories/${file}`, "utf8"),
      );

      if (story.is_folder) {
        folders.push(story);
      } else stories.push(story);
    });

    const pushedFoldersIds = [];

    let count = 0;

    const doesParentExist = (parentId, idsArray) =>
      !!idsArray.find((id) => id.oldId === parentId);

    const pushFolders = async (folders) => {
      if (count >= 20) return spinner.fail(chalk.red("Too manu requests"));

      if (folders.length === 0)
        return spinner.succeed(chalk.green("All folders have been added"));

      const remainingFolders = [];

      spinner.start("Adding folders");

      await folders.reduce((prevPromise, folder) => {
        return prevPromise.then(async () => {
          const isParent = doesParentExist(folder.parent_id, pushedFoldersIds);
          if (!!folder.parent_id && !isParent)
            return remainingFolders.push(folder);

          folder.parent_id = isParent
            ? pushedFoldersIds.find((ids) => ids.oldId === folder.parent_id)
                .newId
            : folder.parent_id;

          try {
            const res = await StoryblokService.postStory(folder);

            const pushedFolder = res.data.story;

            pushedFoldersIds.push({
              name: folder.name,
              newId: pushedFolder.id,
              oldId: folder.id,
            });

            count++;
            return pushedFolder;
          } catch (error) {
            spinner.fail(chalk.red("Error while adding folder", error));
          }
        });
      }, Promise.resolve());

      await pushFolders(remainingFolders);
    };

    await pushFolders(folders);

    spinner.start("Adding stories");

    await Promise.all(
      stories.map(async (story) => {
        const isParent = doesParentExist(story.parent_id, pushedFoldersIds);

        story.parent_id = isParent
          ? pushedFoldersIds.find((ids) => (ids.oldId = story.parent_id)).newId
          : story.parent_id;

        await StoryblokService.postStory(story).catch((error) => {
          spinner.fail(
            `${chalk.red(`Error while adding story - ${story.name}`)}
            ${JSON.stringify(error)}`,
          );
        });
      }),
    ).then((_data, error) => {
      if (error) return;
      spinner.succeed(chalk.green("All Stories have been added"));
    });
  });
};
