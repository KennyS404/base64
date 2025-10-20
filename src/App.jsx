import React, { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('explicacao')
  const [textoOriginal, setTextoOriginal] = useState('Olá!')
  const [imagemBase64, setImagemBase64] = useState('')
  const [showProcess, setShowProcess] = useState(false)

  const textoParaBinario = (texto) => {
    return texto.split('').map(char => {
      const bin = char.charCodeAt(0).toString(2).padStart(8, '0')
      return { char, ascii: char.charCodeAt(0), binario: bin }
    })
  }

  const binarioParaBase64 = (binario) => {
    const btoa64 = btoa(binario)
    return btoa64
  }

  const processarTexto = textoParaBinario(textoOriginal)
  const textoBase64 = btoa(textoOriginal)

  const handleImagemUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemBase64(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Base64 - Codificação Visual</h1>
        <p>Aprenda como funciona a codificação Base64 de forma interativa</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'explicacao' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('explicacao')}
        >
          O que é Base64?
        </button>
        <button 
          className={activeTab === 'texto' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('texto')}
        >
          Texto
        </button>
        <button 
          className={activeTab === 'imagem' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('imagem')}
        >
          Imagem
        </button>
      </div>

      <div className="content">
        {activeTab === 'explicacao' && (
          <div className="explicacao-section">
            <div className="card">
              <h2>O que é Base64?</h2>
              <p>Base64 é um método de <strong>codificação</strong> que transforma dados binários em texto ASCII usando apenas 64 caracteres seguros.</p>
              
              <div className="alfabeto-base64">
                <h3>Alfabeto Base64 (64 caracteres):</h3>
                <div className="alfabeto-grid">
                  <span>A-Z (26)</span>
                  <span>a-z (26)</span>
                  <span>0-9 (10)</span>
                  <span>+ / (2)</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Tabela de Conversão Base64</h2>
              <p>Cada valor de 0 a 63 é representado por um caractere específico:</p>
              
              <div className="tabela-base64">
                <div className="tabela-header">
                  <span>Valor</span>
                  <span>Binário</span>
                  <span>Char.</span>
                  <span>Valor</span>
                  <span>Binário</span>
                  <span>Char.</span>
                  <span>Valor</span>
                  <span>Binário</span>
                  <span>Char.</span>
                  <span>Valor</span>
                  <span>Binário</span>
                  <span>Char.</span>
                </div>
                
                <div className="tabela-body">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="tabela-row">
                      {[0, 1, 2, 3].map(col => {
                        const valor = i + col * 16;
                        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                        const binario = valor.toString(2).padStart(6, '0');
                        return (
                          <React.Fragment key={col}>
                            <span className="valor">{valor}</span>
                            <span className="binario">{binario}</span>
                            <span className="caractere">{base64Chars[valor]}</span>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="tabela-nota">
                <strong>Nota:</strong> O caractere <code>=</code> é usado como padding quando necessário.
              </p>
            </div>

            <div className="card">
              <h2>Como Funciona?</h2>
              <div className="processo">
                <div className="passo">
                  <div className="numero">1</div>
                  <div className="desc">
                    <h3>Texto → Binário</h3>
                    <p>Cada caractere vira 8 bits (ASCII)</p>
                    <div className="exemplo">A → 01000001</div>
                  </div>
                </div>
                
                <div className="seta">↓</div>
                
                <div className="passo">
                  <div className="numero">2</div>
                  <div className="desc">
                    <h3>Agrupa em 6 bits</h3>
                    <p>Divide os bits em grupos de 6</p>
                    <div className="exemplo">010000 | 01</div>
                  </div>
                </div>
                
                <div className="seta">↓</div>
                
                <div className="passo">
                  <div className="numero">3</div>
                  <div className="desc">
                    <h3>Converte para Base64</h3>
                    <p>Cada grupo de 6 bits vira 1 caractere</p>
                    <div className="exemplo">010000 → Q</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Para que serve?</h2>
              <ul className="casos-uso">
                <li>Enviar imagens por email</li>
                <li>Embutir imagens em HTML/CSS</li>
                <li>Transmitir dados binários em JSON/XML</li>
                <li>APIs que só aceitam texto</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'texto' && (
          <div className="texto-section">
            <div className="card">
              <h2>Digite um texto:</h2>
              <input 
                type="text" 
                value={textoOriginal}
                onChange={(e) => setTextoOriginal(e.target.value)}
                className="input-texto"
                placeholder="Digite algo..."
              />
              
              <button 
                className="btn-mostrar-processo"
                onClick={() => setShowProcess(!showProcess)}
              >
                {showProcess ? 'Ocultar' : 'Mostrar'} Processo de Conversão
              </button>
            </div>

            {showProcess && (
              <div className="processo-visual">
                <div className="card">
                  <h3>1. Conversão para ASCII e Binário:</h3>
                  <div className="tabela-conversao">
                    {processarTexto.map((item, index) => (
                      <div key={index} className="linha-conversao">
                        <div className="char-box">{item.char}</div>
                        <div className="seta-pequena">→</div>
                        <div className="ascii-box">ASCII: {item.ascii}</div>
                        <div className="seta-pequena">→</div>
                        <div className="binario-box">{item.binario}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3>2. Sequência completa de bits:</h3>
                  <div className="bits-completos">
                    {processarTexto.map(item => item.binario).join(' ')}
                  </div>
                </div>
              </div>
            )}

            <div className="card resultado">
              <h3>Resultado em Base64:</h3>
              <div className="base64-output">
                {textoBase64}
              </div>
              <button 
                className="btn-copiar"
                onClick={() => navigator.clipboard.writeText(textoBase64)}
              >
                Copiar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'imagem' && (
          <div className="imagem-section">
            <div className="card">
              <h2>Como Base64 funciona com imagens?</h2>
              <div className="explicacao-imagem">
                <p>
                  <strong>Imagens são arquivos binários!</strong> Base64 converte 
                  esses bytes em texto para que possam ser transmitidos como string.
                </p>
                <div className="diferenca">
                  <div className="item">
                    <h4>Texto:</h4>
                    <p>Já é texto → converte direto</p>
                  </div>
                  <div className="item">
                    <h4>Imagem:</h4>
                    <p>Binário (bytes) → converte para texto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Selecione uma imagem:</h2>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImagemUpload}
                className="input-file"
              />
            </div>

            {imagemBase64 && (
              <>
                <div className="card">
                  <h3>Imagem Original:</h3>
                  <img src={imagemBase64} alt="Preview" className="preview-imagem" />
                </div>

                <div className="card">
                  <h3>Estrutura do Data URL:</h3>
                  <div className="data-url-explicacao">
                    <div className="parte-url">
                      <span className="label">Protocolo:</span>
                      <code>data:</code>
                    </div>
                    <div className="parte-url">
                      <span className="label">Tipo MIME:</span>
                      <code>{imagemBase64.split(';')[0].replace('data:', '')}</code>
                    </div>
                    <div className="parte-url">
                      <span className="label">Encoding:</span>
                      <code>base64</code>
                    </div>
                    <div className="parte-url">
                      <span className="label">Dados:</span>
                      <code className="dados-preview">
                        {imagemBase64.split(',')[1].substring(0, 50)}...
                      </code>
                    </div>
                  </div>
                </div>

                <div className="card resultado">
                  <h3>Base64 completo ({imagemBase64.length} caracteres):</h3>
                  <div className="base64-output scrollable">
                    {imagemBase64}
                  </div>
                  <button 
                    className="btn-copiar"
                    onClick={() => navigator.clipboard.writeText(imagemBase64)}
                  >
                    Copiar
                  </button>
                  <p className="nota">
                    <strong>Nota:</strong> O navegador sabe que é uma imagem pelo 
                    prefixo <code>data:image/...</code> no início da string!
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

