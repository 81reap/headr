import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { ulid } from "ulid";

// Remember to rename these classes and interfaces!

interface headerSettings {
	mySetting: string;
}

function formatUlid(ulidString:string) {
    // Extract parts of the ULID to fit the desired format
    // This is a basic example and may need adjustments based on specific requirements
    return `${ulidString.substr(0, 4)}::${ulidString.substr(4, 4)}::${ulidString.substr(8, 4)}::${ulidString.substr(12, 4)}`;
}

const defaultSettings = [
	["title", "", "."],
	["draft", false, "false"],
	["date", new Date().toISOString().split('T')[0], "\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"],
	["updated", new Date().toISOString().split('T')[0], "\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"],
	["tags", "", "."],
	["id", formatUlid(ulid()), "[0-9,a-z]{3}-[0-9,a-z]{2}-[0-9,a-z]{4}"]
]

function checkFrontmatter(app: App): (f: TFile) => Promise<void> {
  return async function (f: TFile): Promise<void> {
  	for (let i = 0; i < defaultSettings.length; i++) {
  		let prop = defaultSettings[i][0] as string
  		let def = defaultSettings[i][1]
  		let regexPattern = defaultSettings[i][2]

  		if (!app.metadataCache.getFileCache(f)?.frontmatter?.[prop]) {
	      await app.fileManager.processFrontMatter(f, (data) => {
					data[prop] = def;
	      });
	    }
  	} 
  };
}

function addIDsToAllNotes(app: App) {
    const _addID = checkFrontmatter(app);
    return function () {
        app.vault.getMarkdownFiles().forEach((f) => _addID(f));
    };
}

export default class headr extends Plugin {
	settings: headerSettings;

	// Called when a file has been indexed or updated. It is now cached.
	async onload() {
		// await this.loadSettings();
 		this.registerEvent(
      this.app.metadataCache.on("changed", checkFrontmatter(this.app))
    );

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	// onunload() {

	// }

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;

// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
