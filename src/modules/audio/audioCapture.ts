import { spawn } from 'child_process';
import * as vscode from 'vscode';
import * as path from 'path';

export function captureAudio(): Promise<string> {
    return new Promise((resolve, reject) => {
        const pythonPath = 'C:\\Users\\jouvence computer\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';
        const scriptPath = 'C:\\Users\\jouvence computer\\Desktop\\M1 Semestre 2\\UE Projet Dr Melat\\pegas-voice-control\\python_scripts\\audio_capture.py';
        const pythonProcess = spawn(pythonPath, [scriptPath]);
        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
            vscode.window.showErrorMessage(`Erreur audio : ${data}`);
        });

        pythonProcess.on('error', (err) => {
            reject(new Error(`Erreur de lancement : ${err.message}`));
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(output.trim());
            }
            else {
                reject(new Error(`Processus audio terminé avec le code ${code}. Erreur : ${errorOutput}`));
            }
        });
    });
}