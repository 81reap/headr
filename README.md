# headr

`headr` is a plugin for Obsidian (https://obsidian.md) that automagically adds frontmatter to markdown files.

## TO DO
- [ ] make frontmatter customizable
- [ ] add warnings for misformatted frontmatter

## Local Development

At a minimum you need `main.js`, `styles.css`, `manifest.json` to have a working plugin. 

1. Create a new Obsidian Vault for testing purposes.
2. Clone this repo into the `.obsidian/plugins/your-plugin-name` folder.
3. Run `bun i` and `bun run build` to get started.

> ![TIP]
> To continuously build the project run `bun run dev`.

> ![WARNING]
> Make sure to check code quality! `bunx eslint main.ts`

## Releasing a new version.

A new release needs to have changes in `manifest.json` and `package.json`. 

1. Update `manifest.json` with your new `minAppVersion` and the minimum Obsidian version required . 
2. Run `bun version patch|minor|major`.

## Adding your plugin to the community plugin list

- Check https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.

## API Documentation

See https://github.com/obsidianmd/obsidian-api
