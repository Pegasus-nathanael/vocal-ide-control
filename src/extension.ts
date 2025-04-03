import * as vscode from 'vscode';
import { captureAudio } from './modules/audio';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('vocal-ide-control.captureAudio', async () => {
        try {
            const audioData = await captureAudio();
            vscode.window.showInformationMessage(`Audio capturé : ${audioData.slice(0, 20)}...`);
        } catch (error) {
            vscode.window.showErrorMessage(`Erreur lors de la capture : ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}