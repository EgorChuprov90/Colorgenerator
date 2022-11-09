const cols = document.querySelectorAll('.column')

document.addEventListener('keydown', (e) => {
   e.preventDefault()
   if (e.code.toLowerCase() === 'space') {
      setRandomColors()
   }
})

document.addEventListener('click', (e) => {
   const type = e.target.dataset.type

   if (type === 'lock') {
      e.target.textContent = e.target.textContent === 'Unlock' ? 'Lock' : 'Unlock';
   } else if (type === 'copy') {
      copyToClickboard(e.target.textContent)
   } else { setRandomColors() }
})

function getRandomColor() {
   const HEX = '0123456789ABCDEF'
   let color = '#'
   for (let i = 0; i < 6; i++) {
      color += HEX[Math.floor(Math.random() * HEX.length)]
   }
   return color
}

function copyToClickboard(text) {
   return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
   const colors = isInitial ? getColorsFromHash() : []

   cols.forEach((col, index) => {
      const isLocked = col.querySelector('.column__btn').textContent;
      const text = col.querySelector('.column__color')
      const button = col.querySelector('.column__btn')

      if (isLocked.toLocaleLowerCase() === 'lock') {
         colors.push(text.textContent)
         return
      }

      const color = isInitial
         ? colors[index]
            ? colors[index]
            : getRandomColor()
         : getRandomColor()

      if (!isInitial) {
         colors.push(color)
      }

      text.textContent = color
      col.style.background = color

   })

   updateColorsHash(colors)
}


function updateColorsHash(colors = []) {
   document.location.hash = colors
      .map((col) => {
         return col.toString().substring(1)
      })
      .join('-')
}

function getColorsFromHash() {
   if (document.location.hash.length > 1) {
      return document.location.hash
         .substring(1)
         .split('-')
         .map((color) => '#' + color)
   }
   return []
}

setRandomColors(true)