import * as vscode from 'vscode';

export default class Completions implements vscode.CompletionItemProvider
{
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

    // // snake_case -> SnakeCase
    // private snakeToCamel(snake: string): string
    // {
    //     var camel = '';
    //     var needConvertBigChar = false;
    //     for (let i = 0; i < snake.length; i++) {
    //         const char = snake[i];
    //         if(char === '_'){ 
    //             // _は無視して進む
    //             needConvertBigChar = true;
    //             continue; 
    //         }
            
    //         let newChar = needConvertBigChar ? char.toLocaleUpperCase() : char;
    //         camel = camel + newChar;
    //         needConvertBigChar = false;
    //     }
        
    //     return camel;
    // }

    // ChatGPT案
    // "abc_def" -> "abcDef"
    // "abc_def123" -> "abcDef123"
    // "abc_ここは無視_def" -> "abcここは無視Def"
    private snakeToCamel(snake: string): string {
        let camel = '';
        let needConvertBigChar = false;
        for (let i = 0; i < snake.length; i++) {
            const char = snake[i];
            if (char === '_') {
                // アンダースコアが見つかったら、次の文字の大文字変換を行うフラグを立てる
                needConvertBigChar = true;
                continue;
            }
    
            // 英語以外の文字の場合、大文字変換フラグをオフにして、その文字をそのままキャメルケースに追加
            if (!char.match(/[a-zA-Z]/)) {
                needConvertBigChar = false;
                camel += char;
                continue;
            }
    
            // アンダースコアが直後にある場合も、次の文字を大文字変換してキャメルケースに追加
            if (needConvertBigChar) {
                camel += char.toUpperCase();
                needConvertBigChar = false;
            } else {
                camel += char;
            }
        }
    
        return camel;
    }
    
}