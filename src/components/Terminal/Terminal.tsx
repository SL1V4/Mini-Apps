import { useState } from 'react';
import './Terminal.scss';

export default function Terminal() {
  type TerminalState = {
    commandLineText: string;
    commandHint: JSX.Element | string;
  };

  const commandList: Record<string, () => Object> = {
    help: () => {
      return {
        commandLineText: '',
        commandHint: (
          <ul>
            {Object.keys(commandList).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      };
    },
    'show-user': () => {
      window.open('https://t.me/sl1va_XD', '_blank');
      return { commandLineText: '' };
    },
    'show-favorite-song': () => {
      window.open(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        '_blank'
      );
      return { commandLineText: '' };
    },
  };

  const commandMessagess = {
    error: (error: string): string => {
      if (error.length > 30) {
        error = error.slice(0, 30) + '...';
      }

      return `
        terminal: '${error}' is not a terminal command.
        Type 'help' to see available commands.
      `;
    },
    default: `Type 'help' to see available commands.`,
  };

  const [commandLineObject, setCommandLine] = useState<TerminalState>({
    commandLineText: 'help',
    commandHint: commandMessagess.default,
  });

  function changeCommandLine(e: React.ChangeEvent<HTMLInputElement>) {
    setCommandLine((prev) => ({ ...prev, commandLineText: e.target.value }));
  }

  function setFocus(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.selectionStart = e.target.value.length;
  }

  function executeCommand(e: React.FormEvent) {
    e.preventDefault();

    try {
      const command = commandList[commandLineObject.commandLineText];

      if (command === undefined) {
        throw new Error(commandLineObject.commandLineText);
      }

      const newTerminalObject = command();

      if (newTerminalObject) {
        setCommandLine((prev) => {
          return { ...prev, ...newTerminalObject };
        });
      }
    } catch (err: unknown) {
      setCommandLine((prev) => ({
        ...prev,
        commandLineText: '',
        commandHint: commandMessagess.error(`${err}`),
      }));
    }
  }

  return (
    <div className="terminal">
      <div className="terminal__header">
        COOL_USER <span>~/path/app</span>
      </div>

      <form className="terminal__content" onSubmit={executeCommand}>
        <label className="terminal__label" htmlFor="terminalInput">
          <div className="terminal__hint">{commandLineObject.commandHint}</div>

          <div className="terminal__command">
            <span className="terminal__dollar">$</span>
            <span className="terminal__edit">
              {commandLineObject.commandLineText}
            </span>
            <span className="terminal__caret">&nbsp;</span>
          </div>

          <input
            className="terminal__input"
            type="text"
            id="terminalInput"
            name="terminal__command"
            onChange={changeCommandLine}
            onFocus={setFocus}
            value={commandLineObject.commandLineText}
          />
        </label>
      </form>
    </div>
  );
}
