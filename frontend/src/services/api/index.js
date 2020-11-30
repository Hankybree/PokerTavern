export function getTables() {
  return new Promise((resolve) => {
    fetch('http://195.201.32.3:4000/game/tables', {
      headers: {
        'authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result.tables)
      }).catch(err => {
        alert(err)
        resolve(null)
      })
  })
}