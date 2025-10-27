import * as vscode from 'vscode';
import * as Terser from 'terser';
import * as JSObfuscator from 'javascript-obfuscator';
import CleanCSS = require('clean-css');
import * as HTMLMinifier from 'html-minifier-terser';

export function activate(context: vscode.ExtensionContext) {

    console.log('FORTECode está ativo!');

    let minifyCommand = vscode.commands.registerCommand('fortecode.minify', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
            return;
        }

        const langId = editor.document.languageId;
        let processedText: string = '';

        try {
            switch (langId) {
                case 'javascript':
                    const jsResult = await Terser.minify(selectedText, {
                        mangle: true,
                        compress: true
                    });
                    processedText = jsResult.code || '';
                    break;
                case 'css':
                    const cssResult = new CleanCSS().minify(selectedText);
                    processedText = cssResult.styles;
                    break;
                case 'html':
                    processedText = await HTMLMinifier.minify(selectedText, {
                        removeComments: true,
                        collapseWhitespace: true,
                        minifyJS: true,
                        minifyCSS: true,
                        conservativeCollapse: true,
                        removeRedundantAttributes: true,
                    });
                    break;
                default:
                    vscode.window.showInformationMessage(`FORTECode: Minificação não suportada para "${langId}".`);
                    return;
            }

            if (processedText) {
                editor.edit((editBuilder: vscode.TextEditorEdit) => {
                    editBuilder.replace(selection, processedText);
                });
            } else if (!langId.includes('javascript')) {
                 vscode.window.showWarningMessage(`FORTECode: Não foi possível minificar o código.`);
            }


        } catch (error: any) {
            vscode.window.showErrorMessage(`FORTECode (Minify) Erro: ${error.message}`);
        }
    });

    let obfuscateCommand = vscode.commands.registerCommand('fortecode.obfuscate', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; 
        }
        
        if (editor.document.languageId !== 'javascript') {
            vscode.window.showWarningMessage(`FORTECode: Ofuscação só é suportada para JavaScript.`);
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
            return;
        }

        try {
            const config = vscode.workspace.getConfiguration('forteCode.obfuscator');

            const obfuscationResult = JSObfuscator.obfuscate(selectedText, {
                compact: config.get('compact', true),
                controlFlowFlattening: config.get('controlFlowFlattening', true),
                deadCodeInjection: config.get('deadCodeInjection', true),
                debugProtection: config.get('debugProtection', false),
                disableConsoleOutput: config.get('disableConsoleOutput', true),
                stringArray: config.get('stringArray', true),
                rotateStringArray: true,
                stringArrayEncoding: ['base64'], // or rc4
                stringArrayThreshold: 0.75
            });
            
            editor.edit((editBuilder: vscode.TextEditorEdit) => {
                editBuilder.replace(selection, obfuscationResult.getObfuscatedCode());
            });

        } catch (error: any) {
            vscode.window.showErrorMessage(`FORTECode (Obfuscate) Erro: ${error.message}`);
        }
    });

    context.subscriptions.push(minifyCommand, obfuscateCommand);
}

export function deactivate() {} // coming soon