import * as core from '@actions/core'
import {loadConfig} from './config'
import {execaSync} from 'execa'
import {setOutput} from '@actions/core'

async function run(): Promise<void> {
  try {
    const config = loadConfig()
    execaSync('ssh-agent', ['-a', '/tmp/ssh-auth.sock'])
    if (config.privateKeyPath) {
      execaSync('ssh-add', [config.privateKeyPath])
    }
    setOutput('ssh-auth-sock', '/tmp/ssh-auth.sock')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
