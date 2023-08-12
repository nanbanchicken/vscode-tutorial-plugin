import * as vscode from 'vscode';

import Completions from "./completions";

export function activate(context: vscode.ExtensionContext) {
	// スネークケースを検知するとキャメルケースに置き換える

	// // キャメル
	// let pushedButton;
	// let PushedButton;
	// // スネーク
	// let pushed_button;
	// // 亀
	// let pushEDBUtton;
	// // ミラー
	// let nottubedhsup;

	// 補完機能を push
    // const provider = vscode.languages.registerCompletionItemProvider('plaintext', new Completions(), '.');
	const provider = vscode.languages.registerCompletionItemProvider('plaintext', new Completions());
    context.subscriptions.push(provider);

}
export function deactivate() {}
