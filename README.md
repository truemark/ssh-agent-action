# AWS EC2 Run Instance Action

[![LICENSE](https://img.shields.io/badge/license-BSD3-green)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/truemark/ssh-agent-action)](https://github.com/truemark/ssh-agent-action/releases)
![GitHub closed issues](https://img.shields.io/github/issues-closed/truemark/ssh-agent-action)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/truemark/ssh-agent-action)
![build-test](https://github.com/truemark/ssh-agent-action/workflows/build-test/badge.svg)

GitHub action used to start an SSH agent and add a private key to it.

## Examples

```yml
      - name: SSH Agent
        id: ssh-agent
        uses: truemark/ssh-agent-hosts-action@v1
        with:
          private-key-path: ${{ steps.ssh-key.outputs.private-key-path }}
```

## Inputs

| Name             | Type       | Required | Description               |
|------------------|------------|----------|---------------------------|
| private-key-path | string     | No       | Path to the private key   |

## Outputs
| Name            | Description                           |
|-----------------|---------------------------------------|
| ssh-auth-sock   | Path to the socket for the SSH agent  |

## Development

> Install `node version 16`

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:
```bash
$ npm test
```
