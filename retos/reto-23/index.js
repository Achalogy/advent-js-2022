function executeCommands(commands) {
  let cpu = [0, 0, 0, 0, 0, 0, 0, 0]

  let cmd = {
    MOV: (x) => {
      let mov = x.split(",")[0].split(" ")[1]
      cpu[+x.at(-1)] = mov.startsWith("V")
        ? cpu[+mov.at(-1)] : +mov
    },
    ADD: (x) => {
      let v1 = +x.split(",")[0].at(-1)
      let v2 = +x.split(",")[1].at(-1)
      cpu[v1] = (cpu[v1] + cpu[v2]) % 256
    },
    INC: (x) => {
      cpu[+x.at(-1)] = (cpu[+x.at(-1)] + 1) % 256
    },
    DEC: (x) => {
      cpu[+x.at(-1)] = (((cpu[+x.at(-1)] - 1) % 256) + 256) % 256
    },
    JMP: (x) => {
      commands = commands
        .concat(
          commands.slice(+x.split(" ").at(-1),
            (commands.indexOf(x) + 1) * !!cpu[0])
        )
    }
  }

  for (let i = 0; i < commands.length; i++) {
    cmd[commands[i].split(" ")[0]](commands[i])
  }

  return cpu
}


executeCommands([
  'MOV 10,V00', // V00 es 10
  'DEC V00',    // decrementa V00 en 1  <---┐
  'INC V01',    // incrementa V01 en 1      |
  'JMP 1',      // bucle hasta que V00 sea 0 ----┘
  'INC V06'     // incrementa V06 en 1
])