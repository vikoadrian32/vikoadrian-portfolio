import React, { useState, useEffect, useRef } from 'react';


const FloatingCTFTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPath, setCurrentPath] = useState('/home/ctf');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const totalChallenges = 5;
  const user = 'ctf';
  const hostname = 'portfolio';


  // File system simulation
  const fileSystem = {
    '/': {
      type: 'dir',
      contents: {
        'home': {
          type: 'dir',
          contents: {
            'ctf': {
              type: 'dir',
              contents: {
                'welcome.txt': {
                  type: 'file',
                  content: 'Welcome to the CTF Terminal!\n\nThis is your starting point. Use "ls -la" to see all files and directories.\nTry "help" for available commands.\n\nGood luck, hacker!'
                },
                'challenges': {
                  type: 'dir',
                  contents: {
                    'basic': {
                      type: 'dir',
                      contents: {
                        'readme.txt': {
                          type: 'file',
                          content: 'Basic Challenge: Find the hidden flag in this directory.\nHint: Some files might be hidden from normal view.'
                        },
                        '.hidden_flag.txt': {
                          type: 'file',
                          content: 'Congratulations! You found the hidden file.\nFlag: CTF{h1dd3n_f1l3s_4r3_fun}',
                          hidden: true
                        }
                      }
                    },
                    'crypto': {
                      type: 'dir',
                      contents: {
                        'encrypted.txt': {
                          type: 'file',
                          content: 'ROT13 Challenge:\nGuvf vf n fvzcyr ROT13 rapelcgvba.\nSynt: PGS{e0g13_vf_rnfl_gb_oernx}'
                        },
                        'hint.txt': {
                          type: 'file',
                          content: 'This cipher shifts each letter by 13 positions in the alphabet.\nTry the "rot13" command.'
                        }
                      }
                    },
                    'forensics': {
                      type: 'dir',
                      contents: {
                        'evidence.log': {
                          type: 'file',
                          content: '2024-01-15 10:30:15 User logged in\n2024-01-15 10:31:20 File accessed: secret.txt\n2024-01-15 10:32:45 Suspicious activity detected\n2024-01-15 10:33:12 Flag: CTF{l0g_4n4lys1s_m4st3r}\n2024-01-15 10:35:00 User logged out'
                        }
                      }
                    },
                    'steganography': {
                      type: 'dir',
                      contents: {
                        'image_description.txt': {
                          type: 'file',
                          content: 'ASCII Art Challenge:\n\n ██████ ████████ ███████ \n██         ██    ██      \n██         ██    █████   \n██         ██    ██      \n ██████    ██    ██      \n\nThe flag is hidden in plain sight.\nFlag: CTF{4sc11_4rt_h1d3s_s3cr3ts}'
                        }
                      }
                    },
                    'final': {
                      type: 'dir',
                      contents: {
                        'boss.txt': {
                          type: 'file',
                          content: 'Final Challenge: Combine all your knowledge.\nExecute this command to get the final flag: echo "Q1RGe20zJG4zNG5kXzQxbF9jaDRsbDNuZzNzfQ==" | base64 -d'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (text, className = '') => {
    setOutput(prev => [...prev, { text, className, id: Date.now() + Math.random() }]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const getPrompt = () => {
    const shortPath = currentPath.replace('/home/ctf', '~');
    return `${user}@${hostname}:${shortPath}$ `;
  };

  const getCurrentDirectory = () => {
    return getDirectoryByPath(currentPath);
  };

  const getDirectoryByPath = (path) => {
    const parts = path.split('/').filter(p => p);
    let current = fileSystem['/'];

    for (const part of parts) {
      if (current.contents && current.contents[part]) {
        current = current.contents[part];
      } else {
        return null;
      }
    }

    return current;
  };

  const getFileByName = (fileName) => {
    const currentDir = getCurrentDirectory();
    if (!currentDir || !currentDir.contents) {
      return null;
    }
    return currentDir.contents[fileName] || null;
  };

  const checkForFlags = (content) => {
    const flagPattern = /CTF\{[^}]+\}/g;
    const flags = content.match(flagPattern);
    
    if (flags) {
      flags.forEach(flag => {
        addOutput(`🚩 Flag found: ${flag}`, 'text-pink-400 font-bold');
        addOutput('Use "flag <flag_value>" to submit it!', 'text-blue-400');
      });
    }
  };

  const commands = {
    help: () => {
      addOutput('Available commands:', 'text-blue-400');
      addOutput('');
      const helpData = [
        ['help', 'Show this help message'],
        ['ls [options]', 'List directory contents (-a for all, -l for long format)'],
        ['cd <dir>', 'Change directory'],
        ['pwd', 'Print working directory'],
        ['cat <file>', 'Display file contents'],
        ['grep <pattern> <file>', 'Search for pattern in file'],
        ['find <name>', 'Find files by name'],
        ['clear', 'Clear terminal screen'],
        ['whoami', 'Display current user'],
        ['date', 'Show current date and time'],
        ['echo <text>', 'Display text'],
        ['rot13 <text>', 'Apply ROT13 cipher'],
        ['base64 <options> <text>', 'Base64 encode/decode (-d to decode)'],
        ['history', 'Show command history'],
        ['challenges', 'List available challenges'],
        ['progress', 'Show completion progress'],
        ['hint <challenge>', 'Get hint for specific challenge'],
        ['flag <flag>', 'Submit a flag'],
        ['exit' , 'exit terminal']
      ];

      helpData.forEach(([cmd, desc]) => {
        addOutput(`${cmd.padEnd(25)} ${desc}`, cmd === cmd ? 'text-green-400' : '');
      });
    },
    exit: () => {
      addOutput('Exiting terminal...', 'text-yellow-400');
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    },

    ls: (args) => {
      const showAll = args.includes('-a');
      const currentDir = getCurrentDirectory();
      
      if (!currentDir || currentDir.type !== 'dir') {
        addOutput('ls: cannot access directory', 'text-red-400');
        return;
      }

      const items = [];
      for (const [name, item] of Object.entries(currentDir.contents || {})) {
        if (!showAll && name.startsWith('.')) continue;
        items.push({ name, ...item });
      }

      if (items.length === 0) {
        addOutput('Directory is empty');
        return;
      }

      items.sort((a, b) => {
        if (a.type === 'dir' && b.type !== 'dir') return -1;
        if (a.type !== 'dir' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
      });

      items.forEach(item => {
        let className = '';
        if (item.type === 'dir') {
          className = 'text-blue-400 font-bold';
        } else if (item.executable) {
          className = 'text-green-400 font-bold';
        } else if (item.name.startsWith('.')) {
          className = 'text-gray-500';
        }
        
        addOutput(`${item.name}${item.type === 'dir' ? '/' : ''}`, className);
      });
    },

    cd: (args) => {
      if (args.length === 0) {
        setCurrentPath('/home/ctf');
        return;
      }

      const targetPath = args[0];
      let newPath;

      if (targetPath.startsWith('/')) {
        newPath = targetPath;
      } else if (targetPath === '..') {
        const pathParts = currentPath.split('/').filter(p => p);
        pathParts.pop();
        newPath = '/' + pathParts.join('/');
        if (newPath === '/') newPath = '/';
      } else if (targetPath === '.') {
        return;
      } else {
        newPath = currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
      }

      const targetDir = getDirectoryByPath(newPath);
      if (targetDir && targetDir.type === 'dir') {
        setCurrentPath(newPath);
      } else {
        addOutput(`cd: ${targetPath}: No such file or directory`, 'text-red-400');
      }
    },

    pwd: () => {
      addOutput(currentPath);
    },

    cat: (args) => {
      if (args.length === 0) {
        addOutput('cat: missing file operand', 'text-red-400');
        return;
      }

      const fileName = args[0];
      const file = getFileByName(fileName);
      
      if (!file) {
        addOutput(`cat: ${fileName}: No such file or directory`, 'text-red-400');
        return;
      }

      if (file.type === 'dir') {
        addOutput(`cat: ${fileName}: Is a directory`, 'text-red-400');
        return;
      }

      addOutput(file.content);
      checkForFlags(file.content);
    },

    clear: () => {
      clearOutput();
    },

    whoami: () => {
      addOutput(user);
    },

    date: () => {
      addOutput(new Date().toString());
    },

    echo: (args) => {
      const text = args.join(' ');
      
      if (text.includes('|')) {
        const parts = text.split('|').map(p => p.trim());
        if (parts.length === 2 && parts[1] === 'base64 -d') {
          commands.base64(['-d', parts[0].replace(/"/g, '')]);
          return;
        }
      }
      
      addOutput(text);
    },

    rot13: (args) => {
      if (args.length === 0) {
        addOutput('rot13: missing text argument', 'text-red-400');
        return;
      }

      const text = args.join(' ');
      const result = text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
      });
      
      addOutput(result);
      checkForFlags(result);
    },

    base64: (args) => {
      if (args.length < 1) {
        addOutput('base64: missing arguments', 'text-red-400');
        return;
      }

      const decode = args[0] === '-d';
      const text = args.slice(decode ? 1 : 0).join(' ').replace(/"/g, '');

      try {
        if (decode) {
          const result = atob(text);
          addOutput(result);
          checkForFlags(result);
        } else {
          const result = btoa(text);
          addOutput(result);
        }
      } catch (e) {
        addOutput('base64: invalid input', 'text-red-400');
      }
    },

    challenges: () => {
      addOutput('Available CTF Challenges:', 'text-yellow-400 font-bold border-b border-yellow-400');
      addOutput('');
      
      const challenges = [
        { name: 'Basic Challenge', path: '/home/ctf/challenges/basic', difficulty: 'Easy', solved: completedChallenges.has('basic') },
        { name: 'Cryptography', path: '/home/ctf/challenges/crypto', difficulty: 'Easy', solved: completedChallenges.has('crypto') },
        { name: 'Forensics', path: '/home/ctf/challenges/forensics', difficulty: 'Medium', solved: completedChallenges.has('forensics') },
        { name: 'Steganography', path: '/home/ctf/challenges/steganography', difficulty: 'Medium', solved: completedChallenges.has('stego') },
        { name: 'Final Boss', path: '/home/ctf/challenges/final', difficulty: 'Hard', solved: completedChallenges.has('final') }
      ];

      challenges.forEach((challenge, i) => {
        const status = challenge.solved ? '✓' : '○';
        const statusClass = challenge.solved ? 'text-green-400' : 'text-yellow-400';
        addOutput(`${i + 1}. ${status} ${challenge.name} (${challenge.difficulty})`, statusClass);
        addOutput(`   Path: ${challenge.path}`, 'text-gray-400');
        addOutput('');
      });

      addOutput('Navigate to challenge directories and read the files to get started!', 'text-blue-400');
    },

    progress: () => {
      const completed = completedChallenges.size;
      const percentage = Math.round((completed / totalChallenges) * 100);
      
      addOutput('Challenge Progress:', 'text-blue-400');
      addOutput('');
      addOutput(`Completed: ${completed}/${totalChallenges} (${percentage}%)`, 'text-green-400');
      
      const progressBar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
      addOutput(`[${progressBar}] ${percentage}%`, 'text-green-400');
      
      if (completed === totalChallenges) {
        addOutput('');
        addOutput('🎉 Congratulations! You\'ve completed all challenges! 🎉', 'text-green-400');
        addOutput('You are now a certified CTF master!', 'text-green-400');
      }
    },

    flag: (args) => {
      if (args.length === 0) {
        addOutput('flag: missing flag argument', 'text-red-400');
        addOutput('Usage: flag <flag_value>', 'text-gray-400');
        return;
      }

      const flag = args[0];
      const flagMap = {
        'CTF{h1dd3n_f1l3s_4r3_fun}': 'basic',
        'CTF{r0t13_is_easy_to_break}': 'crypto',
        'CTF{l0g_4n4lys1s_m4st3r}': 'forensics',
        'CTF{4sc11_4rt_h1d3s_s3cr3ts}': 'stego',
        'CTF{m4st3r_4nd_4ll_ch4ll3ng3s}': 'final'
      };

      if (flagMap[flag]) {
        const challengeId = flagMap[flag];
        if (completedChallenges.has(challengeId)) {
          addOutput('Flag already submitted for this challenge!', 'text-yellow-400');
        } else {
          setCompletedChallenges(prev => new Set([...prev, challengeId]));
          addOutput('🚩 Correct flag! Challenge completed! 🚩', 'text-green-400');
          addOutput(`You have solved the ${challengeId} challenge!`, 'text-green-400');
          
          if (completedChallenges.size + 1 === totalChallenges) {
            addOutput('');
            addOutput('🎉 CONGRATULATIONS! 🎉', 'text-green-400');
            addOutput('You have completed ALL CTF challenges!', 'text-green-400');
          }
        }
      } else {
        addOutput('❌ Incorrect flag. Try again!', 'text-red-400');
        addOutput('Make sure you copied the flag exactly as shown.', 'text-gray-400');
      }
    },

    hint: (args) => {
      if (args.length === 0) {
        addOutput('Available hints:', 'text-blue-400');
        addOutput('hint basic - Hidden file challenge', 'text-gray-400');
        addOutput('hint crypto - ROT13 cipher challenge', 'text-gray-400');
        addOutput('hint forensics - Log analysis challenge', 'text-gray-400');
        addOutput('hint stego - ASCII art challenge', 'text-gray-400');
        addOutput('hint final - Final boss challenge', 'text-gray-400');
        return;
      }

      const challenge = args[0];
      const hints = {
        basic: 'Use "ls -a" to see hidden files that start with a dot.',
        crypto: 'ROT13 shifts each letter by 13 positions. Try the rot13 command on the encrypted text.',
        forensics: 'Look through the log file line by line. The flag might be hidden in the entries.',
        stego: 'Sometimes the message is hidden in plain sight. Look carefully at the ASCII art.',
        final: 'You need to decode a base64 string. Use the echo command with a pipe to base64 -d'
      };

      if (hints[challenge]) {
        addOutput(`Hint for ${challenge} challenge:`, 'text-blue-400');
        addOutput(hints[challenge], 'text-gray-400');
      } else {
        addOutput(`No hint available for '${challenge}'`, 'text-red-400');
      }
    },

    history: () => {
      if (history.length === 0) {
        addOutput('No commands in history');
        return;
      }

      history.forEach((cmd, i) => {
        addOutput(`${i + 1}  ${cmd}`);
      });
    }
  };

  const executeCommand = (commandLine) => {
    addOutput(`${getPrompt()}${commandLine}`, 'text-white');
    
    const parts = commandLine.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (commands[command]) {
      commands[command](args);
    } else {
      addOutput(`bash: ${command}: command not found`, 'text-red-400');
      addOutput('Type "help" for available commands.', 'text-gray-400');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const command = currentInput.trim();
      if (command) {
        setHistory(prev => [...prev, command]);
        setHistoryIndex(history.length + 1);
        executeCommand(command);
      }
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex] || '');
      } else {
        setHistoryIndex(history.length);
        setCurrentInput('');
      }
    }
  };

  const openTerminal = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (output.length === 0) {
      // Show welcome message
      addOutput(`
    ╔══════════════════════════════════════════════╗
    ║           CTF TERMINAL CHALLENGE             ║
    ║                                              ║
    ║  Welcome to the Hack The Portfolio CTF!     ║
    ║  Solve challenges to prove your skills       ║
    ║                                              ║
    ║  Type 'help' for available commands          ║
    ║  Type 'challenges' to see available CTFs     ║
    ╚══════════════════════════════════════════════╝`, 'text-green-400 font-mono text-sm whitespace-pre');
      addOutput('System initialized. Ready for hacking!', 'text-green-400');
      addOutput('');
    }
  };

  const closeTerminal = () => {
    setIsOpen(false);
  };

  const minimizeTerminal = () => {
    setIsMinimized(true);
  };

  const maximizeTerminal = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Shell Icon */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-75 opacity-75' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={openTerminal}
          className="group relative bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {/* Terminal Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Open CTF Terminal
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-600 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            ref={terminalRef}
            className={`relative bg-gray-900 rounded-lg shadow-2xl border-2 border-green-500 transition-all duration-300 ${
              isMinimized
                ? 'w-80 h-12'
                : 'w-full max-w-4xl h-full max-h-[80vh]'
            }`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-green-500">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <button
                    onClick={closeTerminal}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                  />
                  <button
                    onClick={minimizeTerminal}
                    className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
                  />
                  <button
                    onClick={maximizeTerminal}
                    className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
                  />
                </div>
                <span className="text-green-400 font-mono text-sm font-bold ml-4">
                  CTF Terminal - Hack The Portfolio
                </span>
              </div>
              <div className="text-green-400 text-sm">
                {completedChallenges.size}/{totalChallenges} Challenges
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <div className="flex flex-col h-full bg-black rounded-b-lg">
                {/* Output Area */}
                <div
                  ref={outputRef}
                  className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap"
                  style={{ maxHeight: 'calc(80vh - 120px)' }}
                >
                  {output.map((line) => (
                    <div key={line.id} className={`mb-1 ${line.className}`}>
                      {line.text}
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="flex items-center p-4 border-t border-gray-700">
                  <span className="text-green-400 font-mono text-sm mr-2">
                    {getPrompt()}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white font-mono text-sm outline-none caret-green-400"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="text-green-400 font-mono animate-pulse">█</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCTFTerminal;