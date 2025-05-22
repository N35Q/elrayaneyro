// Máquina Enigma - Script completo
class EnigmaMachine {
    constructor() {
        this.rotors = [
            "qzlkfbmriyvsgcuowjphtxnaed",
            "dtbxlrwjzfockiupnesymvqgha", 
            "ncdzqlxfpwkrgjetbosmyhuvia",
            "yupqblnhmxotwczsjgeidrvfka",
            "jznbhtoisrdymqvuxclgkfepwa"
        ];
        this.alphabet = "abcdefghijklmnopqrstuvwxyz";
        this.currentMode = 'encode';
        this.init();
    }

    init() {
        this.createInterface();
        this.bindEvents();
    }

    createInterface() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="enigma-container">
                <h2>Máquina Enigma</h2>
                
                <div class="mode-selector">
                    <button id="encodeBtn" class="mode-btn active">Escribir (Codificar)</button>
                    <button id="decodeBtn" class="mode-btn">Leer (Decodificar)</button>
                </div>

                <div class="config-section">
                    <h3>Configuración de Rotores</h3>
                    <div class="rotor-config">
                        <div>
                            <label>Rotor 1:</label>
                            <select id="rotor1">
                                <option value="0">Rotor 1 (qzlkfbmriyvsgcuowjphtxnaed)</option>
                                <option value="1">Rotor 2 (dtbxlrwjzfockiupnesymvqgha)</option>
                                <option value="2">Rotor 3 (ncdzqlxfpwkrgjetbosmyhuvia)</option>
                                <option value="3">Rotor 4 (yupqblnhmxotwczsjgeidrvfka)</option>
                                <option value="4">Rotor 5 (jznbhtoisrdymqvuxclgkfepwa)</option>
                            </select>
                            <label>Posición inicial:</label>
                            <input type="number" id="pos1" min="0" max="25" value="0">
                        </div>
                        <div>
                            <label>Rotor 2:</label>
                            <select id="rotor2">
                                <option value="0">Rotor 1 (qzlkfbmriyvsgcuowjphtxnaed)</option>
                                <option value="1" selected>Rotor 2 (dtbxlrwjzfockiupnesymvqgha)</option>
                                <option value="2">Rotor 3 (ncdzqlxfpwkrgjetbosmyhuvia)</option>
                                <option value="3">Rotor 4 (yupqblnhmxotwczsjgeidrvfka)</option>
                                <option value="4">Rotor 5 (jznbhtoisrdymqvuxclgkfepwa)</option>
                            </select>
                            <label>Posición inicial:</label>
                            <input type="number" id="pos2" min="0" max="25" value="0">
                        </div>
                        <div>
                            <label>Rotor 3:</label>
                            <select id="rotor3">
                                <option value="0">Rotor 1 (qzlkfbmriyvsgcuowjphtxnaed)</option>
                                <option value="1">Rotor 2 (dtbxlrwjzfockiupnesymvqgha)</option>
                                <option value="2" selected>Rotor 3 (ncdzqlxfpwkrgjetbosmyhuvia)</option>
                                <option value="3">Rotor 4 (yupqblnhmxotwczsjgeidrvfka)</option>
                                <option value="4">Rotor 5 (jznbhtoisrdymqvuxclgkfepwa)</option>
                            </select>
                            <label>Posición inicial:</label>
                            <input type="number" id="pos3" min="0" max="25" value="0">
                        </div>
                    </div>
                </div>

                <div class="plugboard-section">
                    <h3 id="plugboardTitle">Plugboard (Intercambios antes de rotores)</h3>
                    <p>Hasta 10 letras que se intercambian de 2 en 2:</p>
                    <div class="plugboard">
                        ${Array.from({length: 5}, (_, i) => `
                            <div class="plug-pair">
                                <input type="text" maxlength="1" placeholder="A" class="plug-input">
                                <span>↔</span>
                                <input type="text" maxlength="1" placeholder="B" class="plug-input">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="decodeOnlySection" class="decode-section" style="display: none;">
                    <h3>Configuración de Decodificación</h3>
                    <label>Número de caracteres procesados (para calcular rotación):</label>
                    <input type="number" id="charCount" min="0" value="0">
                </div>

                <div class="text-section">
                    <div class="input-area">
                        <label for="inputText">Texto de entrada:</label>
                        <textarea id="inputText" rows="8" placeholder="Escribe aquí tu texto..."></textarea>
                    </div>
                    <div class="output-area">
                        <label for="outputText">Resultado:</label>
                        <textarea id="outputText" rows="8" readonly placeholder="El resultado aparecerá aquí..."></textarea>
                    </div>
                </div>

                <div class="controls">
                    <button id="processBtn" class="process-btn">Procesar</button>
                    <button id="clearBtn" class="clear-btn">Limpiar</button>
                    <button id="copyBtn" class="copy-btn">Copiar Resultado</button>
                </div>

                <div class="status" id="status"></div>
            </div>
        `;
        
        document.body.appendChild(container);
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .enigma-container {
                max-width: 1000px;
                margin: 20px auto;
                padding: 20px;
                background: #f5f5f5;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                font-family: 'Courier New', monospace;
            }
            .enigma-container h2 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            .mode-selector {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 20px;
            }
            .mode-btn {
                padding: 10px 20px;
                border: 2px solid #007bff;
                background: white;
                color: #007bff;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .mode-btn.active {
                background: #007bff;
                color: white;
            }
            .config-section, .plugboard-section, .decode-section, .text-section {
                background: white;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 8px;
                border: 1px solid #ddd;
            }
            .rotor-config {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            .plugboard {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 10px;
                margin-top: 10px;
            }
            .plug-pair {
                display: flex;
                align-items: center;
                gap: 5px;
                justify-content: center;
            }
            .plug-input {
                width: 40px;
                text-align: center;
                text-transform: uppercase;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            .text-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                resize: vertical;
            }
            .controls {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin: 20px 0;
            }
            .controls button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s;
            }
            .process-btn {
                background: #28a745;
                color: white;
            }
            .clear-btn {
                background: #dc3545;
                color: white;
            }
            .copy-btn {
                background: #17a2b8;
                color: white;
            }
            .controls button:hover {
                opacity: 0.8;
                transform: translateY(-1px);
            }
            .status {
                text-align: center;
                padding: 10px;
                margin-top: 10px;
                border-radius: 5px;
                font-weight: bold;
            }
            .status.success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .status.error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #333;
            }
            select, input[type="number"] {
                width: 100%;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Cambio de modo
        document.getElementById('encodeBtn').addEventListener('click', () => this.setMode('encode'));
        document.getElementById('decodeBtn').addEventListener('click', () => this.setMode('decode'));
        
        // Botones de control
        document.getElementById('processBtn').addEventListener('click', () => this.processText());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAll());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyResult());
        
        // Validación de inputs de plugboard
        document.querySelectorAll('.plug-input').forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
            });
        });
        
        // Validación de texto de entrada
        document.getElementById('inputText').addEventListener('input', (e) => {
            e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        
        // Actualizar botones
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(mode + 'Btn').classList.add('active');
        
        // Mostrar/ocultar secciones específicas del modo
        const decodeSection = document.getElementById('decodeOnlySection');
        const plugboardTitle = document.getElementById('plugboardTitle');
        
        if (mode === 'decode') {
            decodeSection.style.display = 'block';
            plugboardTitle.textContent = 'Plugboard (Intercambios después de rotores)';
        } else {
            decodeSection.style.display = 'none';
            plugboardTitle.textContent = 'Plugboard (Intercambios antes de rotores)';
        }
    }

    getRotorConfiguration() {
        return {
            rotor1: parseInt(document.getElementById('rotor1').value),
            rotor2: parseInt(document.getElementById('rotor2').value),
            rotor3: parseInt(document.getElementById('rotor3').value),
            pos1: parseInt(document.getElementById('pos1').value),
            pos2: parseInt(document.getElementById('pos2').value),
            pos3: parseInt(document.getElementById('pos3').value)
        };
    }

    getPlugboardConfiguration() {
        const plugs = {};
        const plugInputs = document.querySelectorAll('.plug-input');
        
        for (let i = 0; i < plugInputs.length; i += 2) {
            const letter1 = plugInputs[i].value.trim();
            const letter2 = plugInputs[i + 1].value.trim();
            
            if (letter1.length === 1 && letter2.length === 1 && letter1 !== letter2) {
                plugs[letter1] = letter2;
                plugs[letter2] = letter1;
            }
        }
        
        return plugs;
    }

    rotateString(str, positions) {
        positions = ((positions % 26) + 26) % 26;
        return str.slice(positions) + str.slice(0, positions);
    }

    applyPlugboard(letter, plugs) {
        return plugs[letter] || letter;
    }

    processRotor(letter, rotorString, position) {
        const rotatedRotor = this.rotateString(rotorString, position);
        const inputIndex = this.alphabet.indexOf(letter);
        return rotatedRotor[inputIndex];
    }

    processRotorReverse(letter, rotorString, position) {
        const rotatedRotor = this.rotateString(rotorString, position);
        const outputIndex = rotatedRotor.indexOf(letter);
        return this.alphabet[outputIndex];
    }

    encodeText(text, config) {
        const plugs = this.getPlugboardConfiguration();
        let result = '';
        let pos1 = config.pos1;
        let pos2 = config.pos2;
        let pos3 = config.pos3;

        for (let char of text) {
            if (!/[a-z]/.test(char)) continue;

            // 1. Aplicar plugboard (antes de rotores en modo encode)
            let processedChar = this.applyPlugboard(char, plugs);

            // 2. Pasar por los rotores
            processedChar = this.processRotor(processedChar, this.rotors[config.rotor1], pos1);
            processedChar = this.processRotor(processedChar, this.rotors[config.rotor2], pos2);
            processedChar = this.processRotor(processedChar, this.rotors[config.rotor3], pos3);

            result += processedChar;

            // 3. Rotar rotores
            pos1 = (pos1 + 1) % 26;
            if (pos1 === 0) {
                pos2 = (pos2 + 1) % 26;
                if (pos2 === 0) {
                    pos3 = (pos3 + 1) % 26;
                }
            }
        }

        return result;
    }

    decodeText(text, config) {
        const plugs = this.getPlugboardConfiguration();
        let result = '';
        
        // Calcular posición inicial basada en número de caracteres
        const charCount = parseInt(document.getElementById('charCount').value) || 0;
        let pos1 = (config.pos1 + charCount) % 26;
        let pos2 = config.pos2;
        let pos3 = config.pos3;
        
        // Calcular rotaciones del rotor 2 y 3
        const rotor2Rotations = Math.floor((config.pos1 + charCount) / 26);
        const rotor3Rotations = Math.floor((config.pos2 + rotor2Rotations) / 26);
        
        pos2 = (pos2 + rotor2Rotations) % 26;
        pos3 = (pos3 + rotor3Rotations) % 26;

        for (let char of text) {
            if (!/[a-z]/.test(char)) continue;

            let processedChar = char;

            // 1. Pasar por los rotores en orden inverso
            processedChar = this.processRotorReverse(processedChar, this.rotors[config.rotor3], pos3);
            processedChar = this.processRotorReverse(processedChar, this.rotors[config.rotor2], pos2);
            processedChar = this.processRotorReverse(processedChar, this.rotors[config.rotor1], pos1);

            // 2. Aplicar plugboard (después de rotores en modo decode)
            processedChar = this.applyPlugboard(processedChar, plugs);

            result += processedChar;

            // 3. Rotar rotores (igual que en encode)
            pos1 = (pos1 + 1) % 26;
            if (pos1 === 0) {
                pos2 = (pos2 + 1) % 26;
                if (pos2 === 0) {
                    pos3 = (pos3 + 1) % 26;
                }
            }
        }

        return result;
    }

    processText() {
        const inputText = document.getElementById('inputText').value.toLowerCase().replace(/[^a-z]/g, '');
        
        if (!inputText) {
            this.showStatus('Por favor, introduce algún texto para procesar.', 'error');
            return;
        }

        const config = this.getRotorConfiguration();
        let result = '';

        try {
            if (this.currentMode === 'encode') {
                result = this.encodeText(inputText, config);
            } else {
                result = this.decodeText(inputText, config);
            }

            document.getElementById('outputText').value = result;
            this.showStatus(`Texto ${this.currentMode === 'encode' ? 'codificado' : 'decodificado'} correctamente.`, 'success');
        } catch (error) {
            this.showStatus('Error al procesar el texto: ' + error.message, 'error');
        }
    }

    clearAll() {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
        document.querySelectorAll('.plug-input').forEach(input => input.value = '');
        document.getElementById('charCount').value = '0';
        this.showStatus('Campos limpiados.', 'success');
    }

    copyResult() {
        const outputText = document.getElementById('outputText');
        if (outputText.value) {
            navigator.clipboard.writeText(outputText.value).then(() => {
                this.showStatus('Resultado copiado al portapapeles.', 'success');
            }).catch(() => {
                this.showStatus('No se pudo copiar al portapapeles.', 'error');
            });
        } else {
            this.showStatus('No hay resultado para copiar.', 'error');
        }
    }

    showStatus(message, type) {
        const status = document.getElementById('status');
        status.textContent = message;
        status.className = `status ${type}`;
        setTimeout(() => {
            status.textContent = '';
            status.className = 'status';
        }, 3000);
    }
}

// Inicializar la máquina Enigma cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new EnigmaMachine();
});
