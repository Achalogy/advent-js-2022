function canExit(maze) {
  function replace(str) {
    return str
      .replace(/[S][\sE]/g, "SS")
      .replace(/[\sE][S]/g, "SS")
      .split("")
  }
  
  function test() {
    let check = [...maze]
    maze.map((horizontal, i) => {
      maze[i] = replace(horizontal.join(""))
      let v = maze[0].map((_, i) => {
        return(replace(maze.map(x => x[i]).join("")))
      })
      maze[i] = v.map(x => x[i])
    })
    if(check.flat().join("") == maze.flat().join("")) {
      return check
    }else {
      return test()
    }
  }
  
  return !test().flat().includes("E")
}