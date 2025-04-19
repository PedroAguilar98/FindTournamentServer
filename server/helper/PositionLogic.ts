export function getPositionLogic(position:number, positionsTaken:number[], index = 0){
  if((positionsTaken.includes(position)) || (position == 0)){
    let newIndex = index + 1
    return getPositionLogic(newIndex, positionsTaken, newIndex)
    
  }
  positionsTaken.push(position)
  return position
}