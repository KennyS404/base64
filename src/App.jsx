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

  const agruparEm6Bits = (texto) => {
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    const bitsCompletos = texto.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('')
    
    const grupos = []
    let i = 0
    
    while (i < bitsCompletos.length) {
      let grupo6bits = bitsCompletos.substr(i, 6)
      
      if (grupo6bits.length < 6) {
        grupo6bits = grupo6bits.padEnd(6, '0')
      }
      
      const decimal = parseInt(grupo6bits, 2)
      const charBase64 = base64Chars[decimal]
      
      grupos.push({
        binario: grupo6bits,
        decimal: decimal,
        char: charBase64,
        posicao: Math.floor(i / 6)
      })
      
      i += 6
    }
    
    return { grupos, bitsCompletos }
  }

  const processarTexto = textoParaBinario(textoOriginal)
  const textoBase64 = btoa(textoOriginal)
  const agrupamento = agruparEm6Bits(textoOriginal)

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
                <strong>Nota:</strong> O caractere <code>=</code> é usado como padding quando o texto não é múltiplo de 3 bytes.
              </p>
            </div>

            <div className="card">
              <h2>Como Funciona?</h2>
              <div className="processo">
                <div className="passo">
                  <div className="numero">1</div>
                  <div className="desc">
                    <h3>Texto → Binário</h3>
                    <p>Cada caractere vira 8 bits (ASCII/UTF-8)</p>
                    <div className="exemplo">"ABC" → 3 bytes = 24 bits</div>
                  </div>
                </div>
                
                <div className="seta">↓</div>
                
                <div className="passo">
                  <div className="numero">2</div>
                  <div className="desc">
                    <h3>Reagrupa em 6 bits</h3>
                    <p>24 bits divididos em 4 grupos de 6 bits</p>
                    <div className="exemplo">24 bits = 4 grupos de 6 bits</div>
                  </div>
                </div>
                
                <div className="seta">↓</div>
                
                <div className="passo">
                  <div className="numero">3</div>
                  <div className="desc">
                    <h3>Converte para Base64</h3>
                    <p>Cada grupo de 6 bits = 1 caractere Base64</p>
                    <div className="exemplo">3 bytes → 4 caracteres</div>
                  </div>
                </div>
                
                <div className="seta">↓</div>
                
                <div className="passo">
                  <div className="numero">4</div>
                  <div className="desc">
                    <h3>Padding (se necessário)</h3>
                    <p>Se sobrar 1 ou 2 bytes, adiciona <code>=</code> ou <code>==</code></p>
                    <div className="exemplo">1 byte → QQ==  |  2 bytes → QWE=</div>
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

                <div className="card">
                  <h3>3. Agrupamento em 6 bits:</h3>
                  <p style={{marginBottom: '15px', color: '#4a5568'}}>
                    Os bits são reagrupados de 8 em 8 para 6 em 6. Cada grupo de 6 bits representa um valor de 0 a 63.
                  </p>
                  <div className="agrupamento-6bits">
                    {agrupamento.grupos.map((grupo, index) => (
                      <div key={index} className="grupo-6bits">
                        <div className="grupo-label">Grupo {index + 1}</div>
                        <div className="grupo-binario">{grupo.binario}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3>4. Conversão para caracteres Base64:</h3>
                  <p style={{marginBottom: '15px', color: '#4a5568'}}>
                    Cada grupo de 6 bits é convertido para decimal (0-63) e mapeado para um caractere da tabela Base64.
                  </p>
                  <div className="conversao-base64">
                    {agrupamento.grupos.map((grupo, index) => (
                      <div key={index} className="linha-base64">
                        <div className="grupo-info">
                          <span className="label-pequeno">Binário</span>
                          <div className="valor-binario">{grupo.binario}</div>
                        </div>
                        <div className="seta-pequena">→</div>
                        <div className="grupo-info">
                          <span className="label-pequeno">Decimal</span>
                          <div className="valor-decimal">{grupo.decimal}</div>
                        </div>
                        <div className="seta-pequena">→</div>
                        <div className="grupo-info">
                          <span className="label-pequeno">Base64</span>
                          <div className="valor-base64">{grupo.char}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {textoBase64.includes('=') && (
                    <div className="padding-explicacao">
                      <strong>⚠️ Sobre o Padding (=):</strong>
                      <div style={{marginTop: '8px'}}>
                        <p style={{marginBottom: '8px'}}>
                          Base64 trabalha com <strong>grupos de 3 bytes</strong>:
                        </p>
                        <ul style={{marginLeft: '20px', marginBottom: '8px'}}>
                          <li>3 bytes (24 bits) = 4 caracteres Base64</li>
                          <li>2 bytes (16 bits) = 3 caracteres Base64 + 1 padding (<code>=</code>)</li>
                          <li>1 byte (8 bits) = 2 caracteres Base64 + 2 paddings (<code>==</code>)</li>
                        </ul>
                        <p style={{marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px'}}>
                          Neste exemplo: <strong>"{textoOriginal}"</strong> tem <strong>{new Blob([textoOriginal]).size} bytes</strong>.<br/>
                          {new Blob([textoOriginal]).size % 3 === 1 && '1 byte sobrou → 2 paddings (==)'}
                          {new Blob([textoOriginal]).size % 3 === 2 && '2 bytes sobraram → 1 padding (=)'}
                          {new Blob([textoOriginal]).size % 3 === 0 && 'Múltiplo de 3 → sem padding'}
                        </p>
                      </div>
                    </div>
                  )}
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

