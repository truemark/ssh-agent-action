import * as core from '@actions/core'
import {loadConfig} from './config'
import {execaSync} from 'execa'
import {setOutput} from '@actions/core'
import * as path from 'path'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const sshDir = path.join(process.env['HOME'] ?? '', '.ssh')
    if (!fs.existsSync(sshDir)) {
      fs.mkdirSync(sshDir, {recursive: true})
      fs.chmodSync(sshDir, '700')
    }
    const socketsDir = path.join(sshDir, 'sockets')
    if (!fs.existsSync(socketsDir)) {
      fs.mkdirSync(socketsDir, {recursive: true})
      fs.chmodSync(socketsDir, '700')
    }
    const sshAuthSock = path.join(socketsDir, 'ssh-auth.sock')
    const config = loadConfig()
    execaSync('ssh-agent', ['-a', sshAuthSock])
    process.env['SSH_AUTH_SOCK'] = sshAuthSock
    if (config.privateKeyPath) {
      execaSync('ssh-add', [config.privateKeyPath])
    }
    setOutput('ssh-auth-sock', sshAuthSock)
    console.log(`SSH agent is running and socket is located at ${sshAuthSock}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
