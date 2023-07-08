import * as vscode from 'vscode';

export default class Completions implements vscode.CompletionItemProvider
{
    // public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    // {
    //     const simpleCompletion = new vscode.CompletionItem('hello_world');
    //     // simpleCompletion.documentation = new vscode.MarkdownString('wa-i!!');
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

    // public provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[]>
    // {
    //     const commandCompletion = new vscode.CompletionItem('new');
    //     commandCompletion.kind = vscode.CompletionItemKind.Event;
    //     commandCompletion.insertText = 'new ';
    //     commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

    //     return [commandCompletion];
    // }

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[]>
    {
        const line = document.lineAt(position).text;
        const wordRange = document.getWordRangeAtPosition(position);
        const word = line.substring(wordRange!.start.character, wordRange!.end.character);
        console.log(word);

        // NOTE スネークケースが残っているところを教えてくれる
        // NOTE position c: 行番号 e: 行内のカーソル位置

        // aaa bbb cccccc -> ['aaa', 'bbb', 'ccc_ccc']
        // aaa bbbvv ccc -> ['aaa', 'bbb_vv', 'ccc']
        // aaa ここを_snakeToCamelしたい ここは意図してにアンダーバーを入れたい____ -> ['aaa', 'bbb_vv', 'ccc']

        // BUG: 入力済みのキーワードでの入力補完が優先されてsnakeToCamelされない
        const isSnakecase = line.indexOf('_') >= 0;
        if (!isSnakecase) { return undefined; }

        // キャメルケースに書き換える
        const camelcase = this.snakeToCamel(word);
        console.log(`old: ${word}\nnew: ${camelcase}`);

        // 入力補完
        const snakeToCamelCompletion = new vscode.CompletionItem(word);
        snakeToCamelCompletion.insertText = camelcase;
        return [snakeToCamelCompletion];
    }

    // snake_case -> SnakeCase
    private snakeToCamel(snake: string): string
    {
        var camel = '';
        var needConvertBigChar = false;
        for (let i = 0; i < snake.length; i++) {
            const char = snake[i];
            if(char === '_'){ 
                // _は無視して進む
                needConvertBigChar = true;
                continue; 
            }
            
            let newChar = needConvertBigChar ? char.toLocaleUpperCase() : char;
            camel = camel + newChar;
            needConvertBigChar = false;
        }
        
        return camel;
    }
}