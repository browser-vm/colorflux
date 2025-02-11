document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', document.getElementById('imageInput').files[0]);
  
    try {
      const response = await fetch('/upload', { method: 'POST', body: formData });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      displayResults(data);
      
      // Preview uploaded image
      const reader = new FileReader();
      reader.onload = (e) => document.getElementById('previewImage').src = e.target.result;
      reader.readAsDataURL(document.getElementById('imageInput').files[0]);
      
    } catch (error) {
      console.error(error);
      alert('Failed to generate color palette.');
    }
  });
  
  function displayResults(colors) {
    const paletteContainer = document.getElementById('colorPalette');
    
    // Clear previous results
    paletteContainer.innerHTML = '';
  
    // Add dominant color swatch
    const dominantDiv = document.createElement('div');
    dominantDiv.className = 'color-swatch dominant';
    dominantDiv.style.backgroundColor = colors.dominant;
    
    dominantDiv.innerHTML = `
      <span class="color-name">Dominant</span>
      <span class="color-hex">${colors.dominant}</span>`;
    
    paletteContainer.appendChild(dominantDiv);
  
    // Add palette colors swatches
    colors.palette.forEach((hex, index) => {
      const colorDiv = document.createElement('div');
      
      colorDiv.className = 'color-swatch';
      colorDiv.style.backgroundColor = hex;
      colorDiv.innerHTML = `
        <span class="color-name">Color ${index + 1}</span>
        <span class="color-hex">${hex}</span>
      `;
      paletteContainer.appendChild(colorDiv);
    });
  }  