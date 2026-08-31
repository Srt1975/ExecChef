import { spawn } from 'node:child_process'

const tasks = [
  { name: 'main', cwd: '/Users/steven/execchef/execchef', command: 'pnpm', args: ['dev'] },
  { name: 'recipe-browser', cwd: '/Users/steven/execchef/execchef/recipe-browser', command: 'pnpm', args: ['dev'] },
  { name: 'feedbackdash', cwd: '/Users/steven/execchef/execchef/feedbackdash', command: 'pnpm', args: ['dev'] },
  { name: 'server', cwd: '/Users/steven/execchef/execchef/server', command: 'pnpm', args: ['start'] },
]

const children = []

function stopAll(exitCode = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM')
    }
  }

  process.exit(exitCode)
}

for (const task of tasks) {
  const child = spawn(task.command, task.args, {
    cwd: task.cwd,
    stdio: 'inherit',
    env: process.env,
  })

  children.push(child)

  child.on('exit', (code, signal) => {
    if (signal) {
      stopAll(0)
      return
    }

    if (code && code !== 0) {
      console.error(`\n[${task.name}] exited with code ${code}`)
      stopAll(code)
    }
  })

  child.on('error', (error) => {
    console.error(`\n[${task.name}] failed to start: ${error.message}`)
    stopAll(1)
  })
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stopAll(0))
}

console.log('Starting ExecChef suite: main, recipe-browser, feedbackdash, and server')