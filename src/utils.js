export function formatDate(date){
  return  new Date(date).toLocaleDateString() 
}

export function formatTime(date){
    const formattedDate = new Date(date).toLocaleTimeString().split(" ")
    return `${formattedDate[0].split(":")[0]}:${formattedDate[0].split(":")[1]} ${formattedDate[1]}`
}