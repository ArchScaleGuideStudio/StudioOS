import { spawn } from 'node:child_process';

const commands = [
  { name: 'whatsapp', args: ['run', 'whatsapp'] },
  { name: 'app', args: ['run', 'dev'] },
];

const children = commands.map(({ name, args }) => {
  const child = spawn('npm', args, {
    cwd: process.cwd(),
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
  });

  const prefix = `[${name}]`;
  child.stdout.on('data', (chunk) => process.stdout.write(`${prefix} ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`${prefix} ${chunk}`));
  child.on('exit', (code, signal) => {
    if (code !== 0 && signal !== 'SIGTERM') {
      process.stderr.write(`${prefix} exited with code ${code ?? signal}\n`);
    }
  });
  return child;
});

function stopAll(signal = 'SIGTERM') {
  children.forEach((child) => {
    if (!child.killed) child.kill(signal);
  });
}

process.on('SIGINT', () => {
  stopAll('SIGINT');
  process.exit(130);
});

process.on('SIGTERM', () => {
  stopAll('SIGTERM');
  process.exit(143);
});
