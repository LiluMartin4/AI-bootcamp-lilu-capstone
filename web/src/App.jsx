import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { applyCommand, createInitialState } from './game';
import './styles.css';

function App() {
  const [state, setState] = useState(createInitialState);
  const [command, setCommand] = useState('');
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const outputRef = useRef(null);

  const isOptionLine = (line) => /^\d+\.\s/.test(line);
  const isTitleLine = (line, index, lines) => {
    if (!line || isOptionLine(line)) {
      return false;
    }

    if (
      line === 'Choose an option:' ||
      line.startsWith('Gold:') ||
      line.startsWith('Inventory:') ||
      line.startsWith("Market commands:") ||
      line.startsWith('Type restart') ||
      line.startsWith('>')
    ) {
      return false;
    }

    const prev = lines[index - 1];
    const next = lines[index + 1];
    return prev === '' && typeof next === 'string' && next !== '';
  };

  useLayoutEffect(() => {
    if (!outputRef.current) {
      return;
    }
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [state.output.length]);

  useEffect(() => {
    const el = outputRef.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      el.scrollTop = el.scrollHeight;
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const next = applyCommand(state, command);
    setState(next);
    setCommand('');
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <h1>Trail of Echoes</h1>
          <button
            type="button"
            className="inventory-toggle"
            onClick={() => setInventoryOpen((open) => !open)}
          >
            {inventoryOpen ? 'Close Inventory' : 'Open Inventory'}
          </button>
        </div>
        <p>Browser-hosted text adventure terminal</p>
      </header>

      <main className="terminal-shell">
        <div className="terminal-screen" ref={outputRef}>
          {state.output.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={`line ${
                isOptionLine(line)
                  ? 'option-line'
                  : isTitleLine(line, index, state.output)
                    ? 'title-line'
                    : 'narrative-line'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        <form className="terminal-input" onSubmit={onSubmit}>
          <span>&gt;</span>
          <input
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="Enter option number or command..."
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      </main>

      {inventoryOpen && (
        <aside className="inventory-panel" aria-label="Inventory panel">
          <div className="inventory-panel-header">
            <h2>Inventory</h2>
            <button type="button" onClick={() => setInventoryOpen(false)}>
              Close
            </button>
          </div>
          <p className="inventory-meta">Gold: {state.gold}</p>
          {state.inventory.length > 0 ? (
            <ul className="inventory-list">
              {state.inventory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="inventory-empty">Inventory is empty.</p>
          )}
        </aside>
      )}
    </div>
  );
}

export default App;
