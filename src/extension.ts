import * as vscode from 'vscode';
import * as path from 'path';
const sound = require('sound-play');

let lastPlayTime = 0;

export function activate(context: vscode.ExtensionContext) {
    const soundPath = path.join(context.extensionPath, 'error.mp3');

    // This is the STABLE API that fixes your error:
    const terminalListener = vscode.window.onDidEndTerminalShellExecution((event) => {
        
        if (event.exitCode && event.exitCode !== 0) {
            const now = Date.now();
            
            if (now - lastPlayTime > 3000) {
                sound.play(soundPath).catch((err: any) => console.error("Sound failed:", err));
                lastPlayTime = now;
            }
        }
    });

    context.subscriptions.push(terminalListener);
}

export function deactivate() {}