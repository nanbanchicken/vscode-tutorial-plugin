import * as vscode from 'vscode';

export default class Completions implements vscode.CompletionItemProvider
{
    // public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    // {
    //     const simpleCompletion = new vscode.CompletionItem('hello_world');
    //     simpleCompletion.documentation = new vscode.MarkdownString('wa-i!!');
    //     simpleCompletion.insertText = 'helloWorld';
    //     return [simpleCompletion];
    // }

    // public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    // {
    //     const snippetCompletion = new vscode.CompletionItem('Good part of the day');
    //     snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');

    //     return [snippetCompletion];
    // }

    // public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    // {
    //     const commitCharacterCompletion = new vscode.CompletionItem('console');
    //     commitCharacterCompletion.commitCharacters = ['.', 'e'];
    //     commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

    //     return [commitCharacterCompletion];
    // }

    public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    {
        const commandCompletion = new vscode.CompletionItem('new');
        commandCompletion.insertText = 'new ';
        commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

        return [commandCompletion];
    }
}