import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// キャメル
	let pushedButton;
	// スネーク
	let pushed_button;
	// 亀
	let pushEDBUtton;
	// ミラー
	let nottubedhsup;

	let disposable = vscode.commands.registerCommand('vscode-tutorial-plugin.helloWorld', () => {
		const pushed_button = vscode.window.showInformationMessage('Hello World from vscode_tutorial_plugin!', "tekitou", "mouikko");
		pushed_button.then((value) => {
			// コンソールログに押下したボタン名（Button1 or Button2）が表示されます。
			console.log(value);

			if(value === "tekitou"){  
				console.log("hazure!");
			}
		  });
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
